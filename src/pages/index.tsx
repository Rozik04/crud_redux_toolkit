import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
// import Layout from './layout/Layout';
const Create = lazy(() => import('../pages/create/Create'));
const Home = lazy(() => import('../pages/home/Home'));
const Wishlist = lazy(() => import('../pages/wishlist/Wishlist'));
const Layout = lazy(() => import('../pages/layout/Layout'));




const MainRouters = () => {
  return (

      useRoutes([
        {path:'/', element: <Layout />, children:[
        {path:'/', element:<Home/>},
        {path:'/create', element:<Create/>},
        {path:'/wishlist', element:<Wishlist/>}
        ]}
      ])

  )
}

export default React.memo(MainRouters)