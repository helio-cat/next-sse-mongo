import { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch lock Users data from the database
      const users = await User.find({})

      // Send the lock Users data as the API response
      res.status(200).json(users)
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
