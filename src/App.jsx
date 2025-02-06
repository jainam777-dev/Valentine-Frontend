import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ValentinePickupline from './components/PickupLine/ValentinePickupline';

import { ValentineProposalCard } from './components/ProposalCard/ValentineProposalCard';
import { ValentineProposalCardShare } from './components/ProposalCard/ValetineProposalCardShare';


import ValentineMakePuzzle from './components/Puzzle/ValentineMakePuzzle';
// import ValentineFlipCard from './pages/ValentineFlipCard';


import "./main.css";

function App() {
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.title = "💔 Come Back, Love Awaits! 💔";
    } else {
      document.title = "💖 Your Valentine Awaits! 💖";
    }
  });
  
  return (
    <Router>
      <Routes>
      
        <Route path="/pickupLine" element={<ValentinePickupline />} />

        <Route path="/" element={<ValentineProposalCard />} />
        <Route path="/proposalCardShare" element={<ValentineProposalCardShare />} />
 
        <Route path="/makePuzzle" element={<ValentineMakePuzzle />} />
        {/* <Route path="/valentine-flipCard" element={<ValentineFlipCard />} /> */ }
      </Routes>
    </Router>
  );
}

export default App;