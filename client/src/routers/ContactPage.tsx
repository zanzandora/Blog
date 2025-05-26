import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <div className='mb-12'>
      <h1 className='text-5xl text-center my-4 w-full text-gray-800 '>
        Get In Touch
      </h1>
      <div className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Contact Info */}
        <div className='space-y-6 lg:order-1 order-2'>
          <Card>
            <CardHeader>
              <CardTitle>My Contact</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-gray-700'>
              <div className='flex items-center gap-3'>
                <MapPin className='text-primary' />
                <span>123 Đường ABC, Quận 1, TP.HN</span>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='text-primary' />
                <span>contact@yourcompany.com</span>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='text-primary' />
                <span>+84 123 456 789</span>
              </div>
            </CardContent>
          </Card>

          {/* Google Map Placeholder */}
          <div className='aspect-video w-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1310713556204!2d105.89622067471436!3d21.027440887824902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a96a85453f37%3A0x39ce34aaf20a939!2sAeon%20Mall%20Long%20Bi%C3%AAn!5e0!3m2!1svi!2s!4v1748197718611!5m2!1svi!2s'
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                borderRadius: '12px',
              }}
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <Card className='shadow-lg order-1 lg:order-2'>
          <CardHeader>
            <CardTitle>Send Your Words !</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contact Form */}
            <ContactForm />

            {/* Social icon */}
            <div className='flex items-center gap-4 my-6  justify-center '>
              <div className='social-button'>
                <section className='flex justify-center items-center'>
                  <button className='group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#00B2FF] text-white font-semibold hover:translate-y-3  transition-all duration-500 hover:from-[#331029] hover:to-[#310413]'>
                    {/* Messenger SVG */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      width='1em'
                      height='1.1em'
                      className='w-5'
                    >
                      <g clipPath='url(#clip0_7_1331)'>
                        <path
                          fill='white'
                          d='M12.0258 0.375C5.46187 0.375 0.375 5.17219 0.375 11.6517C0.375 15.0408 1.76766 17.9695 4.03453 19.9927C4.42594 20.3447 4.34531 20.5486 4.41188 22.7222C4.41712 22.8744 4.45953 23.0231 4.53541 23.1552C4.6113 23.2873 4.71835 23.3988 4.84723 23.48C4.97612 23.5613 5.12292 23.6097 5.27482 23.6212C5.42673 23.6326 5.57914 23.6067 5.71875 23.5458C8.19891 22.4536 8.23078 22.3673 8.65125 22.4817C15.8367 24.4594 23.625 19.8609 23.625 11.6517C23.625 5.17219 18.5902 0.375 12.0258 0.375ZM19.0214 9.05297L15.5995 14.4703C15.4703 14.674 15.3004 14.8488 15.1005 14.9838C14.9005 15.1188 14.6749 15.211 14.4376 15.2547C14.2004 15.2984 13.9567 15.2927 13.7218 15.2378C13.4869 15.1829 13.2658 15.0801 13.0725 14.9358L10.35 12.8981C10.2283 12.8068 10.0803 12.7575 9.92813 12.7575C9.77599 12.7575 9.62796 12.8068 9.50625 12.8981L5.83266 15.6844C5.34234 16.0561 4.70016 15.4688 5.03062 14.9498L8.4525 9.5325C8.58167 9.32874 8.75155 9.15386 8.95148 9.01884C9.15142 8.88382 9.37709 8.79156 9.61436 8.74786C9.85162 8.70416 10.0954 8.70995 10.3303 8.76487C10.5652 8.8198 10.7862 8.92267 10.9795 9.06703L13.7011 11.1042C13.8228 11.1955 13.9708 11.2448 14.123 11.2448C14.2751 11.2448 14.4231 11.1955 14.5448 11.1042L18.2203 8.32078C18.7097 7.94672 19.3519 8.5336 19.0214 9.05297Z'
                        ></path>
                      </g>
                      <defs>
                        <clipPath id='clip0_7_1331'>
                          <rect fill='white' height='24' width='24'></rect>
                        </clipPath>
                      </defs>
                    </svg>

                    <span className='absolute -mt-3 opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:translate-y-10 duration-700'>
                      Messenger
                    </span>
                  </button>
                </section>
              </div>

              <div className='social-button'>
                <section className='flex justify-center items-center'>
                  <Link
                    to={'/'}
                    className='group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-[#316FF6] text-white font-semibold hover:translate-y-3  transition-all duration-500 hover:from-[#331029] hover:to-[#310413]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1.1em'
                      viewBox='0 0 448 512'
                      strokeWidth='0'
                      fill='currentColor'
                      stroke='currentColor'
                      className='w-5'
                    >
                      <path d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'></path>
                    </svg>
                    <span className='absolute -mt-3 opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:translate-y-10 duration-700'>
                      Facebook
                    </span>
                  </Link>
                </section>
              </div>
              <div>
                <section className='flex justify-center items-center'>
                  <Link
                    to={'https://github.com/zanzandora'}
                    className='group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3  transition-all duration-500 hover:from-[#331029] hover:to-[#310413]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 15 15'
                      width='1em'
                      height='1.1em'
                      className='w-5'
                    >
                      <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        fill='currentColor'
                        d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
                      ></path>
                    </svg>
                    <span className='absolute -mt-3 opacity-0  group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:translate-y-10 duration-700'>
                      GitHub
                    </span>
                  </Link>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
