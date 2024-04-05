"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Provience {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  ProvienceId: number;
}

interface LocalLevel {
  id: number;
  name: string;
  districtId: number;
}

interface Area {
  id: number;
  name: string;
  locallevelID: number;
}

const Dropdown: React.FC = () => {
  const [Provience, setProvience] = useState<Provience[]>([]);
  const [selectedProvience, setSelectedProvience] = useState<number | null>(null);

  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);

  const [LocalLevel, setLocalLevel] = useState<LocalLevel[]>([]);
  const [selectedLocalLevel, setSelectedLocalLevel] = useState<number | null>(null);

  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  useEffect(() => {
    // Provience fetch gare ko
    axios.get('https://roomrental.pythonanywhere.com/api/address/provinces/')
      .then(response => {
        setProvience(response.data['results']);
      })
      .catch(error => {
        console.error('Error fetching Provience:', error);
      });
  }, []);

  useEffect(() => {
    //  on selected Provience district fetch garya
    if (selectedProvience !== null) {
      axios.get(`https://roomrental.pythonanywhere.com/api/address/districts/?ProvienceId=${selectedProvience}`)
        .then(response => {
          setDistricts(response.data['results']);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    }
  }, [selectedProvience]);

  useEffect(() => {
    // on selected district local level fetch garya
    if (selectedDistrict !== null) {
      axios.get(`https://roomrental.pythonanywhere.com/api/address/local-levels/?districtId=${selectedDistrict}`)
        .then(response => {
          setLocalLevel(response.data['results']);
        })
        .catch(error => {
          console.error('Error fetching areas:', error);
        });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // on selected district local area fetch garya
    if (selectedLocalLevel !== null) {
      axios.get(`https://roomrental.pythonanywhere.com/api/address/local-areas/?locallevelID=${selectedLocalLevel}`)
        .then(response => {
          setAreas(response.data['results']);
        })
        .catch(error => {
          console.error('Error fetching areas:', error);
        });
    }
  }, [selectedLocalLevel]);

  return (
    <div className='flex p-5'>
     
      <select onChange={(e) => setSelectedProvience(Number(e.target.value))}>
        <option value="" disabled selected>Select Provience</option>
        {Provience.map(Provience => (
          <option key={Provience.id} value={Provience.id}>{Provience.name}</option>
        ))}
      </select>

     
      <select onChange={(e) => setSelectedDistrict(Number(e.target.value))} disabled={!selectedProvience}>
        <option value="" disabled selected>Select District</option>
        {districts.map(district => (
          <option key={district.id} value={district.id}>{district.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedLocalLevel(Number(e.target.value))} disabled={!selectedDistrict}>
        <option value="" disabled selected>Select LocalLevel</option>
        {LocalLevel.map(LocalLevel => (
          <option key={LocalLevel.id} value={LocalLevel.id}>{LocalLevel.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedArea(Number(e.target.value))} disabled={!selectedLocalLevel}>
        <option value="" disabled selected>Select Area</option>
        {areas.map(area => (
          <option key={area.id} value={area.id}>{area.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
