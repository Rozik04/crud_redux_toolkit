import React, { Suspense } from 'react'
import './App.css'
import MainRouters from '../src/pages/index'

function App() {

  return (
<>
    <Suspense fallback={<div>Loading...</div>}>
        <MainRouters/>
    </Suspense>
</>
  )
}

export default React.memo(App)
