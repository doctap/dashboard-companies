import React from 'react';
import styles from './App.module.scss';
import { MyCompaniesPage } from './components/pages/myCompanies/MyCompaniesPage';

function App () {
  return (
    <div className={styles.App}>
      
      <MyCompaniesPage />

    </div>
  );
}

export default App;
