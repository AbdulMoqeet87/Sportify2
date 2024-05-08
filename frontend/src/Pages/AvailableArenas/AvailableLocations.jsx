import React from 'react'
import InCity from '../../components/InCityArenas'
import InDistrict from '../../components/InDistrictArenas'
import InTown from '../../components/InTownArenas'


const Avail_Locations = () => {
  return (
    <>      
      <InTown/>
      <InDistrict/>
      <InCity/>
    </>
  )
}

export default Avail_Locations