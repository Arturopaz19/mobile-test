const API = 'https://api.jsonbin.io/b/5ea2fa3e98b3d5375233ca89'

export const getBanks = async () => {
   try {
      let obj
      const request = await fetch(API, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
      })

      if (request.ok) {
         obj = await request.json() 
         return { ok: request.ok, status: request.status, obj }
      } else {
         obj = await request.json()
         return { ok: false, status: request.status, obj: { message: JSON.stringify(obj)} }
      }
   } catch (error) {
      return { ok: false, status: 500, obj: { message: error.message } }
   }
}

