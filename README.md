# nextjsChallenge

Stack used: Next.js 14, HTML, Tailwind CSS, TypeScript.

**Instructions:**
- Create and app that allows users to geolocate addresses using Google Maps API. To show history of previous searches displayed in a list below the map.
- Follow good practices: accessibility, performance, usability, maintainability and scalability.

### SETUP:

```
git clone git@github.com:Graells/nextjsChallenge.git
cd nextjs-app
touch .env

nano .env (add NEXT_PUBLIC_GOOGLE_API_KEY=[your API key])
or
echo "NEXT_PUBLIC_GOOGLE_API_KEY=[Your API Key Here]" > .env

npm i
npm run dev
```

### Comments:

Deployed using Vercel, live demo at: https://nextjs-challenge-beta.vercel.app/

- Testing to be done.
- Improve mobile view.


### Testing:

To test unit testing with Jest:

```
npm run test
```

To test e2e with Cypress:
```
npx cypress open
```