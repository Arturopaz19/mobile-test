const API = 'https://api.jsonbin.io/b/5ea2fa3e98b3d5375233ca89'

export const getBanks = async () => {
   try {
      const request = await fetch(API, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
      })

      if (request.ok) {
         return await request.json()
      }
   } catch (error) {
      return error.message
   }
}

