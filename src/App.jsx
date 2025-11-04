import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Lab01 from './pages/lab01';
import Lab02 from './pages/Lab02';
import Lab3Page from './pages/Lab3Page';
import Lab4Page from './pages/Lab4Page';
import Lab4Add from './pages/Lab4Add';
import Lab4Edit from './pages/Lab4Edit';
import NotFound from './pages/NotFound';

import AppProvider from './data/AppProvider';
import Lab5Page from './pages/Lab5Page';      
import Lab5User from './pages/Lab5User';     
import Lab5PostComments from './pages/Lab5PostComments'; 

function App() {

  return (
    <AppProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="lab01" element={<Lab01 />} />
          <Route path="lab02" element={<Lab02 />} />
          <Route path="lab02/:id" element={<Lab02 />} />
          <Route path="lab3" element={<Lab3Page />} />

          <Route path="lab4">
            <Route index element={<Lab4Page />} />
            <Route path="add" element={<Lab4Add />} />
            <Route path="edit/:id" element={<Lab4Edit />} />
          </Route>

          <Route path="lab5">
            <Route index element={<Lab5Page />} />
            <Route path="users/:id" element={<Lab5User />} />
            <Route path="posts/:id/comments" element={<Lab5PostComments />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App