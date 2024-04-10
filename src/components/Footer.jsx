import * as React from "react";

function Footer() {
  return (
    <div className="flex flex-col p-10 bg-[#2AD300]  h-5/6">
      <div className="flex gap-x-10 self-center h-4/5 mt-8 w-full  max-md:flex-wrap max-md:max-w-full mb-10">
        <div className="flex flex-col w-1/4 self-start mt-6 text-5xl font-medium tracking-tighter leading-9 text-white whitespace-nowrap max-md:text-3xl mr-16">
          <a href="/" className="hover:underline">SolarCompass</a>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/01497e739aee04e23790d2b8b5f18d0c926df3fb3a02d9408457cb7da5991e52?"
            className="self-center mt-14 max-w-full aspect-[1.06] w-[115px] max-md:mt-10"
          />
        </div>
        <div className="flex-auto w-3/4">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-sm font-medium text-neutral-800 max-md:mt-10">
                <a href="/about" className="hover:underline py-4">About us</a>
                <a href="/locations" className="hover:underline py-4">Ogecy locations</a>
                <a href="/ceo" className="hover:underline py-4">Ceos message</a>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-sm font-medium text-neutral-800 max-md:mt-10">
                <a href="/freight" className="hover:underline py-4">Freight Logistics</a>
                <a href="/events" className="hover:underline py-4">Event Logistics</a>
                <a href="/warehousing" className="hover:underline py-4">Warehousing and other</a>
                <a href="/insurance" className="hover:underline py-4">Insurance Services</a>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-sm font-medium text-neutral-800 max-md:mt-10">
                <a href="/contact" className="hover:underline py-4">Contact us</a>
                <a href="/address" className="hover:underline py-4">Copy address to clipboard</a>
                <a href="/maps" className="hover:underline py-4">google maps riyadh</a>
                <a href="/pallet-size" className="hover:underline py-4">pallet size refernce</a>
                <a href="/country-code" className="hover:underline py-4">country code reference</a>
                <a href="/airport-code" className="hover:underline py-4">airport code reference</a>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col max-md:mt-10">
                <div className="text-sm font-medium text-neutral-800">
                  FOLLOW US
                </div>
                <div className="flex gap-2 justify-start pr-12 mt-10 max-md:pr-5">
                  <a href="/facebook">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d93c20e9566d8e2704a4f024a046a7ec48914ec287fedad33dfdbcb593f13ad?"
                      className="shrink-0 w-5 aspect-square"
                    />
                  </a>
                  <a href="/twitter">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/033c027ab1ba66d9cb95c411ba295134cc329e5890a4407a258c8b0650d676d8?"
                      className="shrink-0 w-5 aspect-square mx-7"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start  border-t border-[#1B1B1B] pt-2 mb-3 text-base w-full tracking-tighter leading-4 text-zinc-900 max-md:mt-10 max-md:max-w-full">
        Copyright 2024 © Solar Compass
      </div>
    </div>
  );
}

export default Footer;
