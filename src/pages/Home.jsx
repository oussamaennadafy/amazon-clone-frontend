// dynamic content
import AuthModal from "./../utilities/components/AuthModal";
// static content
import AboveHeader from "../components/Home/AboveHeader";
import FilterBar from "../components/Home/FilterBar";
import Header from "../components/Home/Header";
import Main from "../components/Home/Main";
import FilterModal from "./../components/Home/FilterModal";
import Footer from "../components/Home/Footer";

import { useState, useRef, useEffect } from "react";

function Home() {
  const [displayAuthModal, setDisplayAuthModal] = useState(false);
  const [displayFilterModal, setDisplayFilterModal] = useState(false);
  const [selectedCategory, setSetselectedCategory] = useState("Amazing views");
  return (
    <div className="max-w-screen font-medium">
      <AuthModal
        displayAuthModal={displayAuthModal}
        setDisplayAuthModal={setDisplayAuthModal}
      />
      <FilterModal
        displayFilterModal={displayFilterModal}
        setDisplayFilterModal={setDisplayFilterModal}
      />
      <AboveHeader />
      <Header setDisplayAuthModal={setDisplayAuthModal} />
      <FilterBar
        selectedCategory={selectedCategory}
        setSetselectedCategory={setSetselectedCategory}
        setDisplayFilterModal={setDisplayFilterModal}
      />
      <Main selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
}

export default Home;
