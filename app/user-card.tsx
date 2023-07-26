'use client'

import { useCallback, useEffect, useState } from 'react'

export default function UserCard() {
  const [users, setUsers] = useState([])
  // SSE connection reference
  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null)

  const fetchUsers = async () => {
    try {
      const usersResult = await fetch(`/api/getData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const users = await usersResult.json()
      setUsers(users)
    } catch (e) {
      console.error(e)
    }
  }

  const listenToSSEUpdates = useCallback(() => {
    console.log('listenToSSEUpdates func')
    const eventSource = new EventSource('/api/sse')

    eventSource.onopen = () => {
      console.log('SSE connection opened.')
      // Save the SSE connection reference in the state
    }

    eventSource.onmessage = (event) => {
      const data = event.data
      console.log('Received SSE Update:', data)
      fetchUsers()
      // Update your UI or do other processing with the received data
    }

    eventSource.onerror = (event) => {
      console.error('SSE Error:', event)
      // Handle the SSE error here
    }
    setSSEConnection(eventSource)

    return eventSource
  }, [])

  useEffect(() => {
    fetchUsers()
    listenToSSEUpdates()

    return () => {
      if (sseConnection) {
        sseConnection.close()
      }
    }
  }, [listenToSSEUpdates])

  // Add "beforeunload" event listener to close SSE connection when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.dir(sseConnection)
      if (sseConnection) {
        console.info('Closing SSE connection before unloading the page.')
        sseConnection.close()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [sseConnection])

  useEffect(() => {
    console.log('users', users)
  }, [users])

  return (
    <div className="m-4 p-2 rounded-lg shadow-sm flex flex-col bg-gray-50">
      {users.map((user, index) => {
        return (
          <div key={index} className="my-2 flex text-slate-800">
            {`${user.fname} ${user.lname} - ${user.username}`}
          </div>
        )
      })}
    </div>
  )
}
