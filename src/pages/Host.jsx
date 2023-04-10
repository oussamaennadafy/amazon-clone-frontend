import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import AuthModal from "../utilities/AuthModal";
import axios from "axios";

function Host() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxAdults, setMaxAdults] = useState(1);
  const [maxChildren, setMaxChildren] = useState(0);
  const [maxInfants, setMaxInfants] = useState(0);
  const [maxPets, setMaxPets] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const fileinputRef = useRef(null);
  /// header code
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayAuthModal, setDisplayAuthModal] = useState(false);
  const toggleMenu = () => {
    setDisplayMenu((previousMenuState) => !previousMenuState);
  };
  const hideModal = () => {
    if (displayMenu) toggleMenu();
  };
  useEffect(() => {
    if (displayAuthModal)
      document.querySelector("body").classList.add("overflow-y-hidden");
    else document.querySelector("body").classList.remove("overflow-y-hidden");
  }, [displayAuthModal]);
  ////
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if all fields are filled
    if (!title || !price || !images || !location || !description) {
      setError("Please fill all fields");
      return;
    }
    // check if price is a number
    if (isNaN(price)) {
      setError("Price must be a number");
      return;
    }
    // // check if images are uploaded
    if (images.length < 5) {
      setError("Please upload at least 5 images");
      return;
    }
    // reset error
    setError(false);
    // send data to the server
    setLoader(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("host", "oussama");
    formData.append("location", location);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("maxAdults", maxAdults);
    formData.append("maxChildren", maxChildren);
    formData.append("maxInfants", maxInfants);
    formData.append("maxPets", maxPets);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    axios
      .post("http://localhost:8000/api/v1/places", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.body.createdPlace);
        // reset form
        setTitle("");
        setPrice("");
        setImages([]);
        fileinputRef.current.value = null;
        setLocation("");
        setDescription("");
        setFrom("");
        setTo("");
        setMaxAdults("");
        setMaxChildren("");
        setMaxInfants("");
        setMaxPets("");
        // hide loader
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setError("something went wrong");
      });
  };
  return (
    <>
      <AuthModal
        displayAuthModal={displayAuthModal}
        setDisplayAuthModal={setDisplayAuthModal}
      />
      <Header
        setDisplayAuthModal={setDisplayAuthModal}
        displayMenu={displayMenu}
        toggleMenu={toggleMenu}
      />
      <section className="min-h-[calc(100vh-132px)] flex items-center justify-center bg-gray-50">
        <div className="w-11/12 sm:w-10/12 md:w-6/12 mx-auto my-8 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">host your home on Airbnb</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price per night
              </label>
              <input
                type="number"
                placeholder="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                images
              </label>
              <input
                type="file"
                multiple
                id="images"
                ref={fileinputRef}
                onChange={(e) => setImages(e.target.files)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Availability
              </label>
              <div className="flex justify-between gap-8">
                <div className="w-1/2">
                  <label htmlFor="from">From</label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="to">To</label>
                  <input
                    type="date"
                    name="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    id="to"
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Restrictions
              </label>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                <div>
                  <label htmlFor="maxAdults">
                    maximium number of adults (13+)
                  </label>
                  <input
                    type="number"
                    name="maxAdults"
                    id="maxAdults"
                    placeholder="max of adults"
                    value={maxAdults}
                    onChange={(e) => setMaxAdults(e.target.value)}
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="maxChildren">
                    maximium number of Children (2-12)
                  </label>
                  <input
                    type="number"
                    name="maxChildren"
                    id="maxChildren"
                    placeholder="max of Children"
                    value={maxChildren}
                    onChange={(e) => setMaxChildren(e.target.value)}
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="maxInfants">
                    maximium number of Infants (Under 2)
                  </label>
                  <input
                    type="number"
                    name="maxInfants"
                    id="maxInfants"
                    placeholder="max of Infants"
                    value={maxInfants}
                    onChange={(e) => setMaxInfants(e.target.value)}
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label htmlFor="maxPets">maximium number of Pets</label>
                  <input
                    type="number"
                    name="maxPets"
                    id="maxPets"
                    placeholder="max of Pets"
                    value={maxPets}
                    onChange={(e) => setMaxPets(e.target.value)}
                    className="shadow appearance-none mt-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              {error && (
                <p className="text-red-400 mb-3 font-medium">{error}</p>
              )}
            </div>
            <div className="flex justify-center">
              {loader ? (
                <button
                  type="submit"
                  disabled
                  className="bg-red-700 transition w-28 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  ...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-red-500 transition mt-3 w-28 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Place
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Host;
