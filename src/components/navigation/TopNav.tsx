'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  RiLayoutGridLine,
  RiFileListLine,
  RiAddLine,
  RiUser3Line,
  RiSettings4Line,
} from 'react-icons/ri'
import { cn } from '@/lib/utils'
import './navigation.css'

const navigation = [
  { name: 'Dashboard', href: '/', icon: RiLayoutGridLine },
  { name: 'Reports', href: '/reports', icon: RiFileListLine },
  { name: 'Add', href: '/add', icon: RiAddLine },
  { name: 'Users', href: '/users', icon: RiUser3Line },
  { name: 'Settings', href: '/settings', icon: RiSettings4Line },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <div className="top-nav-container">
      <ul className="horizontal-nav">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const isAddButton = item.name === 'Add';
          
          return (
            <li key={item.name} className="nav-item">
              <Link 
                href={item.href}
                className={cn(
                  "nav-link",
                  isActive && "active"
                )}
              >
                {isAddButton ? (
                  <div className="add-button">
                    <item.icon />
                  </div>
                ) : (
                  <div className="icon-container">
                    <item.icon />
                  </div>
                )}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )
}
