import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardingHouses } from "../store/action";
import BoardingHousesTableRowOwner from "./BoardingHousesTableRowOwner";

export default function BoardingHousesTable() {
  const dispatch = useDispatch();
  const boardingHouses = useSelector(
    (state) => state.boardingHouses.boardingHouses
  );

  useEffect(() => {
    dispatch(fetchBoardingHouses());
  }, []);

  if (!boardingHouses.length) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center px-8 py-8"
      >
        <div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg
            className="w-12 h-12 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    No.
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Gambar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nama
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Harga/bulan
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Kategori
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Kota
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total Kamar
                  </th>
                  {/* <th scope="col" className="py-3 px-6">
                    UserId
                  </th> */}
                  <th scope="col" className="py-3 px-6">
                    Deskripsi
                  </th>
                  {/* <th scope="col" className="py-3 px-6">
                    location
                  </th> */}

                  <th scope="col" className="py-3 px-6">
                    -
                  </th>

                  <th scope="col" className="py-3 px-6">
                    -
                  </th>
                  <th scope="col" className="py-3 px-6">
                    -
                  </th>
                </tr>
              </thead>
              {boardingHouses.map((boardingHouses, index) => {
                return (
                  <BoardingHousesTableRowOwner
                    key={boardingHouses.id}
                    boardingHouses={boardingHouses}
                    index={index}
                  />
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}
