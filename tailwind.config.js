/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.5rem',
        '3xs': '0.25rem'
      },
      screens: {
        xs : '360px',
        s : '425px',

      },
      colors: {
        light: {
          DEFAULT: "#FAFBFC",
          lighter: "#F3F4F6",
          primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
        },


         //-----order.tsx:-----//
         buttonColorForm:{
          default: '#DC2626',
          hover: '#B91C1C',
          text: '#FFFFFF',
        },
          //LocationForm.tsx + MoreDetailsForm.tsx + OrderNotifications.tsx//
          formBgColor:{
            parent: "#FFFFFF",
            firstChild: "#FFFFFF",
            secondChild: "#FFFFFF"
          },
          formBorder:{
            parent: "#EF4444",
            children: "#D1D5DB",
          },
          headlineText:{
            default: "#111111",
          },
          scrollBottomBt:{
            default: '#DC2626',
            hover: '#B91C1C',
            outline: '#FFFFFF',
          },
          //end locationForm.tsx//
        goBackNCollapse:{
          default: "#F3F4F6",
          hover: "#D1D5DB",
          text: "#4B5563"
        },
        link:{
          text: "#EF4444"
        },
        //-----end order.tsx.-----//

        //-----balance.tsx:-----//
        balanceBgColor:{
          default: "#E8EAED"
        },
        //-----end balance.tsx:-----//




      },
      backgroundImage: {
        RedGradient:
            'linear-gradient(to top, #890010, #990012)',
        DarkRedGradient:
            'linear-gradient(to left, #E65758, #771D32)', 
        LitghRedGradient:
            'linear-gradient(-45deg, #ff5959, #ff4040, #ff0d6e, #ff8033,#d74177)',
        confeti: 'url("/confetti.png")',
        whiteRedGradient:
            'linear-gradient(45deg, #FF0000, #FF7878)'

      },
      height:{
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        136: '34rem',
        144: '36rem',
        152: '38rem',
        160: '40rem',
        168: '42rem',
        176: '44rem',
        184: '46rem',
        192: '48rem',
        200: '50rem',
         
        'screen_1/6': '16.666667vh',
        'screen_1/5': '20vh',
        'screen_1/4': '25vh',
        'screen_1/3': '33vh',
        'screen_2/5': '40vh',
        
        'screen_1/2': '50vh',
        'screen_3/5': '60vh',
        'screen_2/3': '66vh',
        'screen_3/4': '75vh',
        'screen_4/5': '80vh',
      },
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36, .07,.19,.97) both',
        'hoverScale': 'hover-scale 5s cubic-bezier(.36, .07,.19,.97) infinite',
        },
        keyframes: {
          'shake': {
              '10%, 90%' : {
                  transform: 'translate3d(-1px, 0, 0)'
          },
              '20%, 80%' : { 
                  transform: 'translate3d(2px, 0, 0)'
          },
              '30%, 50%, 70%' : { 
                  transform: 'translate3d(-4px, 0, 0)'
          },
              '40%, 60%' : { 
                  transform: 'translate3d(4px, 0, 0)'
          }
        }
      },
      'hover-scale': {
        '0%, 100%': { transform: 'scale(1)' },
        '40%, 60%': { transform: 'scale(1.2) rotate(0)'},
        '46%, 50%, 54%, 42%, 58%': { transform: 'scale(1.2) rotate(5deg)' },
        '48%, 52% , 44%, 56%': { transform: 'scale(1.2) rotate(-5deg)' },
      }
    },
  },
  plugins: [],
};
