export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'admin' | 'user'
  organization: string
  lastLogin: string
  status: 'active' | 'inactive'
}

export const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Adams',
    email: 'alice@acme.com',
    phone: '+1-234-5678',
    role: 'admin',
    organization: 'Acme Inc',
    lastLogin: '2m ago',
    status: 'active'
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob@acme.com',
    phone: '+1-234-5679',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '1h ago',
    status: 'active'
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Clark',
    email: 'carol@beta.com',
    phone: '+1-234-5680',
    role: 'admin',
    organization: 'Beta Corp',
    lastLogin: '3h ago',
    status: 'active'
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Davis',
    email: 'david@acme.com',
    phone: '+1-234-5681',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '1d ago',
    status: 'inactive'
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Evans',
    email: 'eve@gamma.com',
    phone: '+1-234-5682',
    role: 'admin',
    organization: 'Gamma LLC',
    lastLogin: '2d ago',
    status: 'active'
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Foster',
    email: 'frank@acme.com',
    phone: '+1-234-5683',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '5h ago',
    status: 'active'
  },
  {
    id: 7,
    firstName: 'Grace',
    lastName: 'Green',
    email: 'grace@delta.com',
    phone: '+1-234-5684',
    role: 'admin',
    organization: 'Delta Systems',
    lastLogin: '12h ago',
    status: 'active'
  },
  {
    id: 8,
    firstName: 'Henry',
    lastName: 'Hill',
    email: 'henry@beta.com',
    phone: '+1-234-5685',
    role: 'user',
    organization: 'Beta Corp',
    lastLogin: '3d ago',
    status: 'inactive'
  },
  {
    id: 9,
    firstName: 'Iris',
    lastName: 'Irwin',
    email: 'iris@gamma.com',
    phone: '+1-234-5686',
    role: 'user',
    organization: 'Gamma LLC',
    lastLogin: '15m ago',
    status: 'active'
  },
  {
    id: 10,
    firstName: 'Jack',
    lastName: 'Jones',
    email: 'jack@acme.com',
    phone: '+1-234-5687',
    role: 'admin',
    organization: 'Acme Inc',
    lastLogin: '30m ago',
    status: 'active'
  },
  {
    id: 11,
    firstName: 'Kate',
    lastName: 'King',
    email: 'kate@delta.com',
    phone: '+1-234-5688',
    role: 'user',
    organization: 'Delta Systems',
    lastLogin: '2h ago',
    status: 'active'
  },
  {
    id: 12,
    firstName: 'Leo',
    lastName: 'Lee',
    email: 'leo@beta.com',
    phone: '+1-234-5689',
    role: 'admin',
    organization: 'Beta Corp',
    lastLogin: '4d ago',
    status: 'inactive'
  },
  {
    id: 13,
    firstName: 'Mia',
    lastName: 'Miller',
    email: 'mia@gamma.com',
    phone: '+1-234-5690',
    role: 'user',
    organization: 'Gamma LLC',
    lastLogin: '6h ago',
    status: 'active'
  },
  {
    id: 14,
    firstName: 'Noah',
    lastName: 'Nelson',
    email: 'noah@acme.com',
    phone: '+1-234-5691',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '1d ago',
    status: 'active'
  },
  {
    id: 15,
    firstName: 'Olivia',
    lastName: 'Owen',
    email: 'olivia@delta.com',
    phone: '+1-234-5692',
    role: 'admin',
    organization: 'Delta Systems',
    lastLogin: '8h ago',
    status: 'active'
  }
]

