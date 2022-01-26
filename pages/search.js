import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({ searchResults }) {
    const router = useRouter();
    // console.log(searchResults);
    // destructure the query parameter.
    const { location , startDate ,endDate , noOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} to ${ formattedEndDate}`;

  return (
    <div className = "">
       <Header
         placeholder = {`${location}| ${range} | ${noOfGuests} guests`}
       />

    {/* main section */}
      <main className = "flex flex-col md:flex-row">
          <section className = "flex-grow pt-14  px-6 ">
              <p className = "text-xs ">300 + Stays -{range} -  for {noOfGuests} number of guests</p>
              <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location }</h1>

              <div className = "hidden lg:inline-flex mb-6 space-x-3 text-gray-800 whitespace-nowrap  ">
                   <p className= "button"> Cancellation Flexibility</p>
                   <p className = "button">Type of Place </p>
                   <p className = "button">Price </p>
                   <p className = "button">Rooms and Beds </p>
                   <p className = "button">More filters </p>
              </div>

                {/* Rendering Information */}

              <div className = "flex flex-col">
                 { searchResults.map( ({ img ,location , title , description , star, price, total })=> (

                    <InfoCard 
                    key = {img }
                    img = { img }
                    location = { location }
                    title = {title}
                    description={description}
                    star={star}
                    price = { price }
                    total = { total}
                    />

                ))}

              </div>

          </section>

          {/* adding map */}

          <section className = " min-w-[300px] xl:min-w-[500px]">
                 <Map searchResults = { searchResults }/>
          </section>

      </main>

        {/* Footer */}
    <Footer />
    </div>
  );
}

export default Search;


export  async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").
                         then(res => res.json());
        return {
          props: {
            searchResults,
          }
        }
}
