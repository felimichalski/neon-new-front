import smirnoff from '../../assets/logos/smirnoff.png'
import tanqueray from '../../assets/logos/tanqueray.png'
import chandon from '../../assets/logos/chandon.png'
import takeda from '../../assets/logos/takeda.png'
import jansport from '../../assets/logos/jansport.png'

const LogosBar = () => {
    return (
      <div className="bg-white py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-bold leading-8 text-gray-900">
            Confían en nosotros
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={smirnoff}
              alt="Smirnoff"
            />
            <img
              className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
              src={tanqueray}
              alt="Tanqueray"
            />
            <img
              className="col-span-2 max-h-20 w-full object-contain lg:col-span-1"
              src={chandon}
              alt="Chandon"
            />
            <img
              className="col-span-2 max-h-16 w-full object-contain sm:col-start-2 lg:col-span-1"
              src={takeda}
              alt="Takeda"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src={jansport}
              alt="Jansport"
            />
          </div>
        </div>
      </div>
    )
  }
  
export default LogosBar;