import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import {Nunito} from "next/font/google"
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import RegisterModal from './components/modals/RegisterModal'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'


export const metadata = {
  title: 'Holiday Homes & Apartment Rentals - Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({
  subsets : ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <LoginModal/>
          <RegisterModal/>
          <RentModal/>
          <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}