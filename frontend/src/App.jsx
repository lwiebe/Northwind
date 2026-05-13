import { useAuth } from '@clerk/react'
import PageLoader from './components/PageLoader'
import Layout from './components/Layout'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import CheckoutReturnPage from './pages/CheckoutReturnPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SentryDemoPage from './pages/SentryDemoPage'
import OrderChatPage from './pages/OrderChatPage'
import OrderSummaryPage from './pages/OrderSummaryPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrderVideoPage from './pages/OrderVideoPage'

function App() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return <PageLoader />

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/orders' element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} replace />} />
        <Route path='/checkout/return' element={<CheckoutReturnPage />} />
        <Route path='/product/:slug' element={<ProductDetailPage />} />
        <Route path='/demo-sentry' element={<SentryDemoPage />} />
        <Route path='/orders/:id/call' element={isSignedIn ? <OrderVideoPage /> : <Navigate to={"/"} replace />} />

        {/* NESTED ROUTES */}
        <Route path='/orders/:id' element={<OrderDetailsPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
