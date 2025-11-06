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
  },
  {
    id: 16,
    firstName: 'Peter',
    lastName: 'Parker',
    email: 'peter@acme.com',
    phone: '+1-234-5693',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '10m ago',
    status: 'active'
  },
  {
    id: 17,
    firstName: 'Quinn',
    lastName: 'Quinn',
    email: 'quinn@beta.com',
    phone: '+1-234-5694',
    role: 'admin',
    organization: 'Beta Corp',
    lastLogin: '45m ago',
    status: 'active'
  },
  {
    id: 18,
    firstName: 'Rachel',
    lastName: 'Roberts',
    email: 'rachel@gamma.com',
    phone: '+1-234-5695',
    role: 'user',
    organization: 'Gamma LLC',
    lastLogin: '2h ago',
    status: 'active'
  },
  {
    id: 19,
    firstName: 'Sam',
    lastName: 'Smith',
    email: 'sam@delta.com',
    phone: '+1-234-5696',
    role: 'user',
    organization: 'Delta Systems',
    lastLogin: '5d ago',
    status: 'inactive'
  },
  {
    id: 20,
    firstName: 'Tina',
    lastName: 'Turner',
    email: 'tina@acme.com',
    phone: '+1-234-5697',
    role: 'admin',
    organization: 'Acme Inc',
    lastLogin: '1h ago',
    status: 'active'
  },
  {
    id: 21,
    firstName: 'Uma',
    lastName: 'Underwood',
    email: 'uma@beta.com',
    phone: '+1-234-5698',
    role: 'user',
    organization: 'Beta Corp',
    lastLogin: '3h ago',
    status: 'active'
  },
  {
    id: 22,
    firstName: 'Victor',
    lastName: 'Vance',
    email: 'victor@gamma.com',
    phone: '+1-234-5699',
    role: 'admin',
    organization: 'Gamma LLC',
    lastLogin: '4h ago',
    status: 'active'
  },
  {
    id: 23,
    firstName: 'Wendy',
    lastName: 'White',
    email: 'wendy@delta.com',
    phone: '+1-234-5700',
    role: 'user',
    organization: 'Delta Systems',
    lastLogin: '6h ago',
    status: 'active'
  },
  {
    id: 24,
    firstName: 'Xavier',
    lastName: 'Xavier',
    email: 'xavier@acme.com',
    phone: '+1-234-5701',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '7h ago',
    status: 'active'
  },
  {
    id: 25,
    firstName: 'Yara',
    lastName: 'Young',
    email: 'yara@beta.com',
    phone: '+1-234-5702',
    role: 'admin',
    organization: 'Beta Corp',
    lastLogin: '9h ago',
    status: 'active'
  },
  {
    id: 26,
    firstName: 'Zack',
    lastName: 'Zhang',
    email: 'zack@gamma.com',
    phone: '+1-234-5703',
    role: 'user',
    organization: 'Gamma LLC',
    lastLogin: '10h ago',
    status: 'active'
  },
  {
    id: 27,
    firstName: 'Amy',
    lastName: 'Anderson',
    email: 'amy@delta.com',
    phone: '+1-234-5704',
    role: 'user',
    organization: 'Delta Systems',
    lastLogin: '11h ago',
    status: 'active'
  },
  {
    id: 28,
    firstName: 'Brian',
    lastName: 'Baker',
    email: 'brian@acme.com',
    phone: '+1-234-5705',
    role: 'admin',
    organization: 'Acme Inc',
    lastLogin: '12h ago',
    status: 'active'
  },
  {
    id: 29,
    firstName: 'Chloe',
    lastName: 'Carter',
    email: 'chloe@beta.com',
    phone: '+1-234-5706',
    role: 'user',
    organization: 'Beta Corp',
    lastLogin: '1d ago',
    status: 'inactive'
  },
  {
    id: 30,
    firstName: 'Daniel',
    lastName: 'Diaz',
    email: 'daniel@gamma.com',
    phone: '+1-234-5707',
    role: 'user',
    organization: 'Gamma LLC',
    lastLogin: '2d ago',
    status: 'active'
  },
  {
    id: 31,
    firstName: 'Emma',
    lastName: 'Edwards',
    email: 'emma@delta.com',
    phone: '+1-234-5708',
    role: 'admin',
    organization: 'Delta Systems',
    lastLogin: '3d ago',
    status: 'active'
  },
  {
    id: 32,
    firstName: 'Felix',
    lastName: 'Fisher',
    email: 'felix@acme.com',
    phone: '+1-234-5709',
    role: 'user',
    organization: 'Acme Inc',
    lastLogin: '4d ago',
    status: 'inactive'
  },
  {
    id: 33,
    firstName: 'Gina',
    lastName: 'Garcia',
    email: 'gina@beta.com',
    phone: '+1-234-5710',
    role: 'user',
    organization: 'Beta Corp',
    lastLogin: '5d ago',
    status: 'active'
  },
  {
    id: 34,
    firstName: 'Harry',
    lastName: 'Harris',
    email: 'harry@gamma.com',
    phone: '+1-234-5711',
    role: 'admin',
    organization: 'Gamma LLC',
    lastLogin: '6d ago',
    status: 'active'
  },
  {
    id: 35,
    firstName: 'Ivy',
    lastName: 'Ingram',
    email: 'ivy@delta.com',
    phone: '+1-234-5712',
    role: 'user',
    organization: 'Delta Systems',
    lastLogin: '7d ago',
    status: 'active'
  }
]

