import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData }) {
  //  console.log(exploreData)
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* header */}
      <Header/>

      {/* Banner */}
      <Banner/>

      {/* Main */}

      <main className= "max-w-7xl mx-auto px-8 sm:px-16">
        <section className = "pt-6">
            <h2 className="text-4xl font-semibold pb-5"> Explore Nearby </h2>

            {/* pull some data from the server */}
            <div className = "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
               { exploreData?.map( ({ img ,location , distance }) => (
             
                <SmallCard 
                  key = { img }
                  img = { img}
                  location = { location }
                  distance = { distance }
                />
                ))}
            </div>

        </section>
      </main>

      {/* Footer */}
    </div>
  );
}

export async function  getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp').
                        then((res) => res.json());
  // const allData = JSON.stringify(exploreData)
    
           return {
               props:{
                 exploreData
               }
             };         
}
