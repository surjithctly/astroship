import React from 'react';
import './App.css';
import Header from './components/Header';
import WaitingListForm from './components/WaitingListForm';

function App() {
  const handleSubscription = (email) => {
    // Handle the subscription logic here (e.g., API call, storing data, etc.)
    console.log(`Subscribed with email: ${email}`);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <WaitingListForm onSubmit={handleSubscription} />
      </main>
    </div>
  );
}

export default App;
