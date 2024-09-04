"use client"
import Image from 'next/image';
import Link from 'next/link';

const  ElectionAnalytics =()=> {
  return (
    <div className="h-screen flex flex-col bg-gray-50  overflow-y-scroll">
      <header className="bg-white py-4 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">Nigeria Election</h1>
          <p className="text-lg text-gray-600">2024</p>
        </div>
      </header>

      <main className="flex-grow p-4">
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-center text-xl font-bold text-gray-700">Total Votes</h2>
          <p className="text-center text-3xl font-bold text-green-600 mt-2">40,343,255,536</p>
        </div>

        <section className="">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Votes by Candidate</h3>
           
              <li className="flex justify-between bg-white pt-4">
                <span className='text-black'>Peter Obi <span className="text-xs text-gray-500">(Labour Party)</span></span>
                <span className="font-bold text-black">12,454,464,388</span>
              </li>

              <li className="flex justify-between bg-white pt-4">
                <span className='text-black'>Atiku Abubakar <span className="text-xs text-gray-500">(PDP)</span></span>
                <span className="font-bold text-black">454,464,388</span>
              </li>

              <li className="flex justify-between bg-white pt-4">
                <span className='text-black'>Rabiu Musa Kwankwaso <span className="text-xs text-gray-500">(NNPP)</span></span>
                <span className="font-bold text-black">22,454,464,388</span>
              </li>

              <li className="flex justify-between bg-white pt-4 ">
                <span className='text-black'>Ahmed Bola Tinubu <span className="text-xs text-gray-500">(APC)</span></span>
                <span className="font-bold text-black">22,454,464,388</span>
              </li>
            
          </div>

          <div className="bg-white shadow rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Votes by State</h3>

              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Kano</span>
                <span className="font-bold text-black">12,454,464,388</span>
              </li>
              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Niger</span>
                <span className="font-bold text-black">1,454,464,388</span>
              </li>
              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Bayelsa</span>
                <span className="font-bold text-black">454,464,388</span>
              </li>
              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Cross River</span>
                <span className="font-bold text-black">22,454,464,388</span>
              </li>
              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Kaduna</span>
                <span className="font-bold text-black">22,454,464,388</span>
              </li>
              <li className="flex justify-between py-2 bg-white pt-4">
                <span className='text-black'>Lagos</span>
                <span className="font-bold text-black">22,454,464,388</span>
              </li>
          </div>
        </section>
      </main>

      {/* <footer className="bg-white py-4 flex justify-around items-center shadow-sm">
        <Link href="/">
          <a className="text-green-600 font-bold">Home</a>
        </Link>
        <Link href="/profile">
          <a className="text-gray-600">Profile</a>
        </Link>
        <Link href="/logout">
          <a className="text-red-600">Logout</a>
        </Link>
      </footer> */}
    </div>
  );
}

export default ElectionAnalytics;
