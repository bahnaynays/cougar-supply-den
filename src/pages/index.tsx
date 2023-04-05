import { NextPage } from "next";
import React from "react";

import { GetServerSideProps } from 'next';
import { Person } from '../interfaces/Person';
import { getPeople } from '../lib/api';

interface HomeProps {
  people: Person[];
}

const HomePage: NextPage = () => {
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl my-8">Cougar Supply Den DBMS Content Will Be Located Here</h1>
        </div>
      </div>
    </div>

    
  );
};


<div className ="container justify-between">
  <h1>this is a test</h1>
</div>

export default HomePage;
