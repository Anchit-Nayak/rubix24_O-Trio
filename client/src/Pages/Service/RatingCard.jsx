import React from 'react'
import { rateService } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

const RatingCard = ({service}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [safety,setSafety] = React.useState('')
  const [honesty,setHonesty] = React.useState('')
  const [pricing,setPricing] = React.useState('')
  const userId = localStorage.getItem('userId')
  const RateService = async () => {
    const response = await rateService({userId,
      serviceId:service,
      safetyRating:Number(safety),
      honestyRating:Number(honesty),
      priceRating:Number(pricing)
    })
    if(response) toast.success(response.message)
    window.location.reload();
  }
  return (
    <>
      <button
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Give Rating
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl text-white">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-6">
                    Rate This Service
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 pb-3 flex-auto">
                  <form action="" method="post" className='flex flex-col'>
                    <div className='py-2 space-x-3 w-full flex flex-row items-baseline'>
                    <label htmlFor="" className=''>Safety: </label>
                    <input type="text" value={safety} onChange={(e)=>setSafety(e.target.value)} className='p-2 text-lg mt-1 rounded-lg w-16 bg-gray-700'/>
                    <p className='text-xl font-bold'>/10</p>
                    </div>
                    <div className='py-2 space-x-3 w-full flex flex-row items-baseline'>
                    <label htmlFor="" className='mt-4'>Reliability: </label>
                    <input type="text" value={honesty} onChange={(e)=>setHonesty(e.target.value)} className='p-2 text-lg mt-1 rounded-lg w-16 bg-gray-700'/>
                    <p className='text-xl font-bold'>/10</p>
                    </div>
                    <div className='py-2 space-x-3 w-full flex flex-row items-baseline'>
                    <label htmlFor="" className='mt-4'>Cost Effectiveness: </label>
                    <input type="text" value={pricing} onChange={(e)=>setPricing(e.target.value)} className='p-2 text-lg mt-1 rounded-lg w-16 bg-gray-700'/>
                    <p className='text-xl font-bold'>/10</p>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary-500 text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false);RateService()}}
                  >
                    Rate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </>
  );
}

export default RatingCard