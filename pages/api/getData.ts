import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch lock Users data from the database
      const users = [
        {
          fname: 'Ashton',
          lname: 'MacRierie',
          username: 'amacrierie0',
        },
        {
          fname: 'Mathias',
          lname: 'Burditt',
          username: 'mburditt1',
        },
        {
          fname: 'Patric',
          lname: 'Stuttard',
          username: 'pstuttard2',
        },
        {
          fname: 'Trstram',
          lname: "O'Cannan",
          username: 'tocannan3',
        },
        {
          fname: 'Egon',
          lname: 'Robottham',
          username: 'erobottham4',
        },
        {
          fname: 'Rosabel',
          lname: 'Paulino',
          username: 'rpaulino5',
        },
        {
          fname: 'Gayle',
          lname: 'Bemment',
          username: 'gbemment6',
        },
        {
          fname: 'Deina',
          lname: 'Edelheit',
          username: 'dedelheit7',
        },
        {
          fname: 'Angelle',
          lname: 'Bruton',
          username: 'abruton8',
        },
        {
          fname: 'Lindsay',
          lname: 'Wedderburn',
          username: 'lwedderburn9',
        },
      ]

      // Send the lock Users data as the API response
      res.status(200).json(users)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
