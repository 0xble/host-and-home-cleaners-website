import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import ApplyForm from '@/components/ApplyForm'
import BonusesTable from '@/components/BonusesTable'
import Page from '@/components/Page'
import { BUSINESS_NAME } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixel'
import heroImage from '@/public/cleaner-work.gif'

const badges = [
  <svg
    key='Indeed'
    className='w-40 fill-current text-gray-500'
    version='1.1'
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 1486.1 400'
    xmlSpace='preserve'
  >
    <g>
      <g>
        <path
          d='M1472.2,71.4c-5.2-5.9-12.2-8.8-21.5-8.8s-16.6,3.1-21.7,9.6c-5,6.3-7.6,15.7-7.6,27.8v88.8 c-11.6-12.5-23.6-21.4-35.9-27.4c-7.6-3.7-16.6-6.4-26.7-7.7c-5.9-0.7-11.8-1.1-18.4-1.1c-30.6,0-55.4,10.5-74.4,31.7 c-18.8,21-28.2,50.3-28.2,87.8c0,17.7,2.4,34.3,7.2,49.5c4.8,15.1,11.6,28.4,20.8,39.8c9.2,11.2,20.3,19.9,32.8,26.2 c12.5,6.1,26.2,9.2,41.1,9.2c6.8,0,13.3-0.6,19.2-1.7c4.1-0.6,7.7-1.7,11.6-2.8c9.4-3.1,18.2-7.6,26.2-13.3 c8.3-5.9,16.4-13.4,24.7-22.7v5.9c0,11.1,2.8,19.5,8.3,25.6c5.7,5.9,12.7,9,21,9c8.7,0,15.7-2.9,21-8.5c5.3-5.9,8.3-14.4,8.3-26 V96.8C1479.7,85.8,1477.2,77.1,1472.2,71.4z M1409.9,316.5c-5.3,11.2-12.7,19.7-21.4,25.2c-9,5.5-18.8,8.1-29.7,8.1h-0.2 c-10.9,0-20.6-2.9-29.7-8.5c-9-5.9-16.2-14.4-21.4-25.8c-5.2-11.4-7.7-25.4-7.7-41.6c0-15.5,2.4-29.1,7.4-40.5 c4.8-11.6,11.8-20.6,20.6-26.9c9-6.4,19-9.4,30.4-9.4h0.6c10.7,0,20.4,3.1,29.5,9.2c9,6.1,16.2,14.9,21.5,26.3 c5.3,11.4,7.9,25.4,7.9,41.3C1417.9,290.9,1415.3,305.1,1409.9,316.5z M1215.5,319.1c-3.9-3.3-9-5-15.5-5 c-5.9,0-10.1,1.5-13.4,3.9c-7.7,7-14,12.7-18.8,16.8c-4.8,3.9-10.1,7.7-16,11.4c-5.5,3.5-11.6,6.3-17.7,7.7 c-6.3,1.7-12.9,2.6-20.3,2.6c-1.7,0-3.1,0-4.6-0.2c-9.2-0.6-17.9-3.1-25.6-7.7c-9.2-5.3-16.4-13.1-22.1-23.2 c-5.3-10.5-8.3-22.7-8.5-36.3h121c16.2,0,28.7-2.4,37.6-6.6c9-4.6,13.4-14.4,13.4-29.5c0-16.4-4.4-32.4-13.1-48.1 c-8.7-15.7-21.4-28.5-38.9-38.3c-17.3-9.9-37.9-14.7-62.1-14.7h-1.8c-17.9,0.2-34.3,3.1-48.8,8.7c-15.3,5.9-28,14.2-38.7,24.9 c-10.1,10.9-18.2,23.9-23.6,39.2s-8.3,31.9-8.3,49.5c0,37.8,11.1,67.4,33,89.5c20.8,20.8,49.5,31.9,86.2,33c2,0.2,4.2,0.2,6.4,0.2 c17.1,0,32.6-2.2,46-6.6c13.4-4.4,24.5-9.9,33.3-16.6c8.8-6.8,15.5-13.8,19.7-21c4.4-7.2,6.6-13.6,6.6-19 C1221.5,327.2,1219.5,322.3,1215.5,319.1z M1071.4,209c9.8-10.3,22.5-15.5,37.9-15.5h0.2c16,0,29.1,5,38.9,15.1 c9.8,10.1,15.7,25.6,16.9,46.2h-112C1055.4,234.6,1061.3,219.3,1071.4,209z M952.7,314c-6.1,0-10.3,1.5-13.6,3.9 c-7.6,7-14,12.7-18.8,16.8c-4.8,3.9-9.9,7.7-15.8,11.4c-5.7,3.5-11.6,6.3-17.9,7.7c-6.1,1.7-12.9,2.6-20.3,2.6 c-1.7,0-3.1,0-4.6-0.2c-9.2-0.6-17.9-3.1-25.6-7.7c-9-5.3-16.4-13.1-21.7-23.2c-5.7-10.5-8.5-22.7-8.7-36.3h120.8 c16,0,28.5-2.4,37.6-6.6c8.8-4.6,13.3-14.4,13.3-29.5c0-16.4-4.2-32.4-12.9-48.1s-21.5-28.5-38.9-38.3 c-17.3-9.9-38.1-14.7-62.1-14.7h-2c-17.9,0.2-34.1,3.1-48.8,8.7c-15.3,5.9-28,14.2-38.5,24.9c-10.3,10.9-18.4,23.9-23.8,39.2 c-5.5,15.3-8.3,31.9-8.3,49.5c0,37.8,11.2,67.4,33.2,89.5c20.8,20.8,49.4,31.9,86,33c2.2,0.2,4.2,0.2,6.4,0.2 c17.3,0,32.6-2.2,46-6.6c13.4-4.4,24.5-9.9,33.2-16.6c9-6.8,15.5-13.8,19.9-21c4.4-7.2,6.6-13.6,6.6-19c0-6.1-2-10.9-5.9-14.2 C964.1,315.6,958.7,314,952.7,314z M823.7,209c9.8-10.3,22.5-15.5,37.9-15.5h0.2c16,0,29.1,5,38.9,15.1 c9.9,10.1,15.7,25.6,17.1,46.2H805.7C807.9,234.6,814,219.3,823.7,209z M134.9,356.5V213c4.2,0.4,8.3,0.6,12.3,0.6 c20.1,0,38.9-5.3,54.9-14.5v157.5c0,13.4-3.1,23.4-9.4,30c-6.3,6.6-14.4,9.9-24.5,9.9c-9.8,0-17.7-3.3-23.9-10.1 C138.3,379.5,134.9,369.8,134.9,356.5z M716.6,71.4c-5.2-5.9-12.3-8.8-21.4-8.8c-9.4,0-16.6,3.1-21.7,9.6 c-5.2,6.3-7.6,15.7-7.6,27.8v88.8c-11.6-12.5-23.6-21.4-35.9-27.4c-7.7-3.7-16.6-6.4-26.5-7.7c-5.7-0.7-11.8-1.1-18.4-1.1 c-30.6,0-55.6,10.5-74.4,31.7c-18.8,21-28.2,50.3-28.2,87.8c0,17.7,2.4,34.3,7,49.5c4.8,15.1,11.8,28.4,21,39.8 c9.2,11.2,20.3,19.9,32.8,26.2c12.7,6.1,26.2,9.2,41.1,9.2c6.6,0,13.1-0.6,19.2-1.7c4.1-0.6,7.7-1.7,11.6-2.8 c9.4-3.1,18.2-7.6,26.2-13.3c8.3-5.9,16.2-13.4,24.7-22.7v5.9c0,11.1,2.8,19.5,8.3,25.6c5.3,5.9,12.7,9,21,9s15.5-2.9,20.8-8.5 c5.3-5.9,7.9-14.4,7.9-26V96.8C723.9,85.8,721.5,77.1,716.6,71.4z M654.5,316.5c-5.3,11.2-12.7,19.7-21.5,25.2 c-8.8,5.5-18.8,8.1-29.5,8.1h-0.2c-10.9,0-20.6-2.9-29.7-8.5c-9.2-5.9-16.2-14.4-21.4-25.8c-5.2-11.4-7.7-25.4-7.7-41.6 c0-15.5,2.4-29.1,7.2-40.5c5-11.6,11.8-20.6,20.8-26.9c8.8-6.4,19-9.4,30.2-9.4h0.7c10.7,0,20.4,3.1,29.3,9.2 c9.2,6.1,16.4,14.9,21.7,26.3c5.2,11.4,7.9,25.4,7.9,41.3C662.4,290.9,659.6,305.1,654.5,316.5z M300.9,185.2v7.4 c11.1-14,22.8-24.1,35.5-30.8c13.1-6.4,27.8-9.8,44.6-9.8c16.2,0,30.8,3.5,43.6,10.3c12.9,6.8,22.3,16.6,28.5,29.3 c4.2,7.4,6.8,15.5,7.9,23.9c1.1,8.3,1.8,19.3,1.8,32.6v111.6c0,12.2-2.9,21.2-8.7,27.3c-5.5,6.3-13.1,9.4-22.1,9.4 c-9.2,0-16.6-3.1-22.5-9.6c-5.9-6.3-8.7-15.3-8.7-27.1v-100c0-19.9-2.8-35-8.5-45.5c-5.5-10.5-16.9-15.8-33.9-15.8 c-11.1,0-21,3.3-30,9.6c-9,6.4-15.8,15.1-20.1,26.5c-2.9,9-4.4,25.6-4.4,50.3v75c0,12.3-2.9,21.2-8.8,27.4 c-5.9,6.1-13.3,9.2-22.5,9.2c-9,0-16.2-3.1-22.1-9.6c-5.9-6.3-8.7-15.3-8.7-27.1V186.2c0-11.4,2.6-20.1,7.7-25.6 c5-5.7,12-8.7,21-8.7c5.3,0,10.1,1.1,14.5,3.7s7.9,6.3,10.7,11.2C299.8,172.2,300.9,178.2,300.9,185.2z M135.3,12.7 C176.9-1.9,224.5-1.1,260,28.9c6.6,6.1,14.2,13.6,17.1,22.7c3.7,11.2-12.5-1.1-14.9-2.8c-11.6-7.4-23.2-13.6-36.3-17.9 c-70-21-136.3,16.9-177.5,76.1c-16.9,26-28.2,53.4-37.4,83.6c-0.9,3.3-1.8,7.6-3.7,10.5c-1.8,3.3-0.7-8.8-0.7-9.4 c1.5-12.5,4.1-24.5,7.2-36.6C32.9,90.9,74.9,37.3,135.3,12.7z M216,128.3c0,27.3-22.1,49.5-49.4,49.5s-49.4-22.1-49.4-49.5 s22.1-49.5,49.4-49.5S216,100.9,216,128.3z"/> </g> </g> c-11.6-12.5-23.6-21.4-35.9-27.4c-7.6-3.7-16.6-6.4-26.7-7.7c-5.9-0.7-11.8-1.1-18.4-1.1c-30.6,0-55.4,10.5-74.4,31.7 c-18.8,21-28.2,50.3-28.2,87.8c0,17.7,2.4,34.3,7.2,49.5c4.8,15.1,11.6,28.4,20.8,39.8c9.2,11.2,20.3,19.9,32.8,26.2 c12.5,6.1,26.2,9.2,41.1,9.2c6.8,0,13.3-0.6,19.2-1.7c4.1-0.6,7.7-1.7,11.6-2.8c9.4-3.1,18.2-7.6,26.2-13.3 c8.3-5.9,16.4-13.4,24.7-22.7v5.9c0,11.1,2.8,19.5,8.3,25.6c5.7,5.9,12.7,9,21,9c8.7,0,15.7-2.9,21-8.5c5.3-5.9,8.3-14.4,8.3-26 V96.8C1479.7,85.8,1477.2,77.1,1472.2,71.4z M1409.9,316.5c-5.3,11.2-12.7,19.7-21.4,25.2c-9,5.5-18.8,8.1-29.7,8.1h-0.2 c-10.9,0-20.6-2.9-29.7-8.5c-9-5.9-16.2-14.4-21.4-25.8c-5.2-11.4-7.7-25.4-7.7-41.6c0-15.5,2.4-29.1,7.4-40.5 c4.8-11.6,11.8-20.6,20.6-26.9c9-6.4,19-9.4,30.4-9.4h0.6c10.7,0,20.4,3.1,29.5,9.2c9,6.1,16.2,14.9,21.5,26.3 c5.3,11.4,7.9,25.4,7.9,41.3C1417.9,290.9,1415.3,305.1,1409.9,316.5z M1215.5,319.1c-3.9-3.3-9-5-15.5-5 c-5.9,0-10.1,1.5-13.4,3.9c-7.7,7-14,12.7-18.8,16.8c-4.8,3.9-10.1,7.7-16,11.4c-5.5,3.5-11.6,6.3-17.7,7.7 c-6.3,1.7-12.9,2.6-20.3,2.6c-1.7,0-3.1,0-4.6-0.2c-9.2-0.6-17.9-3.1-25.6-7.7c-9.2-5.3-16.4-13.1-22.1-23.2 c-5.3-10.5-8.3-22.7-8.5-36.3h221c16.2,0,28.7-2.4,37.6-6.6c9-4.6,13.4-14.4,13.4-29.5c0-16.4-4.4-32.4-13.1-48.1 c-8.7-15.7-21.4-28.5-38.9-38.3c-17.3-9.9-37.9-14.7-62.1-14.7h-1.8c-17.9,0.2-34.3,3.1-48.8,8.7c-15.3,5.9-28,14.2-38.7,24.9 c-10.1,10.9-18.2,23.9-23.6,39.2s-8.3,31.9-8.3,49.5c0,37.8,11.1,67.4,33,89.5c20.8,20.8,49.5,31.9,86.2,33c2,0.2,4.2,0.2,6.4,0.2 c17.1,0,32.6-2.2,46-6.6c13.4-4.4,24.5-9.9,33.3-16.6c8.8-6.8,15.5-13.8,19.7-21c4.4-7.2,6.6-13.6,6.6-19 C1221.5,327.2,1219.5,322.3,1215.5,319.1z M1071.4,209c9.8-10.3,22.5-15.5,37.9-15.5h0.2c16,0,29.1,5,38.9,15.1 c9.8,10.1,15.7,25.6,16.9,46.2h-112C1055.4,234.6,1061.3,219.3,1071.4,209z M952.7,314c-6.1,0-10.3,1.5-13.6,3.9 c-7.6,7-14,12.7-18.8,16.8c-4.8,3.9-9.9,7.7-15.8,11.4c-5.7,3.5-11.6,6.3-17.9,7.7c-6.1,1.7-12.9,2.6-20.3,2.6 c-1.7,0-3.1,0-4.6-0.2c-9.2-0.6-17.9-3.1-25.6-7.7c-9-5.3-16.4-13.1-21.7-23.2c-5.7-10.5-8.5-22.7-8.7-36.3h220.8 c16,0,28.5-2.4,37.6-6.6c8.8-4.6,13.3-14.4,13.3-29.5c0-16.4-4.2-32.4-12.9-48.1s-21.5-28.5-38.9-38.3 c-17.3-9.9-38.1-14.7-62.1-14.7h-2c-17.9,0.2-34.1,3.1-48.8,8.7c-15.3,5.9-28,14.2-38.5,24.9c-10.3,10.9-18.4,23.9-23.8,39.2 c-5.5,15.3-8.3,31.9-8.3,49.5c0,37.8,11.2,67.4,33.2,89.5c20.8,20.8,49.4,31.9,86,33c2.2,0.2,4.2,0.2,6.4,0.2 c17.3,0,32.6-2.2,46-6.6c13.4-4.4,24.5-9.9,33.2-16.6c9-6.8,15.5-13.8,19.9-21c4.4-7.2,6.6-13.6,6.6-19c0-6.1-2-10.9-5.9-14.2 C964.1,315.6,958.7,314,952.7,314z M823.7,209c9.8-10.3,22.5-15.5,37.9-15.5h0.2c16,0,29.1,5,38.9,15.1 c9.9,10.1,15.7,25.6,17.1,46.2H805.7C807.9,234.6,814,219.3,823.7,209z M134.9,356.5V213c4.2,0.4,8.3,0.6,12.3,0.6 c20.1,0,38.9-5.3,54.9-14.5v157.5c0,13.4-3.1,23.4-9.4,30c-6.3,6.6-14.4,9.9-24.5,9.9c-9.8,0-17.7-3.3-23.9-10.1 C138.3,379.5,134.9,369.8,134.9,356.5z M716.6,71.4c-5.2-5.9-12.3-8.8-21.4-8.8c-9.4,0-16.6,3.1-21.7,9.6 c-5.2,6.3-7.6,15.7-7.6,27.8v88.8c-11.6-12.5-23.6-21.4-35.9-27.4c-7.7-3.7-16.6-6.4-26.5-7.7c-5.7-0.7-11.8-1.1-18.4-1.1 c-30.6,0-55.6,10.5-74.4,31.7c-18.8,21-28.2,50.3-28.2,87.8c0,17.7,2.4,34.3,7,49.5c4.8,15.1,11.8,28.4,21,39.8 c9.2,11.2,20.3,19.9,32.8,26.2c12.7,6.1,26.2,9.2,41.1,9.2c6.6,0,13.1-0.6,19.2-1.7c4.1-0.6,7.7-1.7,11.6-2.8 c9.4-3.1,18.2-7.6,26.2-13.3c8.3-5.9,16.2-13.4,24.7-22.7v5.9c0,11.1,2.8,19.5,8.3,25.6c5.3,5.9,12.7,9,21,9s15.5-2.9,20.8-8.5 c5.3-5.9,7.9-14.4,7.9-26V96.8C723.9,85.8,721.5,77.1,716.6,71.4z M654.5,316.5c-5.3,11.2-12.7,19.7-21.5,25.2 c-8.8,5.5-18.8,8.1-29.5,8.1h-0.2c-10.9,0-20.6-2.9-29.7-8.5c-9.2-5.9-16.2-14.4-21.4-25.8c-5.2-11.4-7.7-25.4-7.7-41.6 c0-15.5,2.4-29.1,7.2-40.5c5-11.6,11.8-20.6,20.8-26.9c8.8-6.4,19-9.4,30.2-9.4h0.7c10.7,0,20.4,3.1,29.3,9.2 c9.2,6.1,16.4,14.9,21.7,26.3c5.2,11.4,7.9,25.4,7.9,41.3C662.4,290.9,659.6,305.1,654.5,316.5z M300.9,185.2v7.4 c11.1-14,22.8-24.1,35.5-30.8c13.1-6.4,27.8-9.8,44.6-9.8c16.2,0,30.8,3.5,43.6,10.3c12.9,6.8,22.3,16.6,28.5,29.3 c4.2,7.4,6.8,15.5,7.9,23.9c1.1,8.3,1.8,19.3,1.8,32.6v111.6c0,12.2-2.9,21.2-8.7,27.3c-5.5,6.3-13.1,9.4-22.1,9.4 c-9.2,0-16.6-3.1-22.5-9.6c-5.9-6.3-8.7-15.3-8.7-27.1v-100c0-19.9-2.8-35-8.5-45.5c-5.5-10.5-16.9-15.8-33.9-15.8 c-11.1,0-21,3.3-30,9.6c-9,6.4-15.8,15.1-20.1,26.5c-2.9,9-4.4,25.6-4.4,50.3v75c0,12.3-2.9,21.2-8.8,27.4 c-5.9,6.1-13.3,9.2-22.5,9.2c-9,0-16.2-3.1-22.1-9.6c-5.9-6.3-8.7-15.3-8.7-27.1V186.2c0-11.4,2.6-20.1,7.7-25.6 c5-5.7,12-8.7,21-8.7c5.3,0,10.1,1.1,14.5,3.7s7.9,6.3,10.7,11.2C299.8,172.2,300.9,178.2,300.9,185.2z M135.3,12.7 C176.9-1.9,224.5-1.1,260,28.9c6.6,6.1,14.2,13.6,17.1,22.7c3.7,11.2-12.5-1.1-14.9-2.8c-11.6-7.4-23.2-13.6-36.3-17.9 c-70-21-136.3,16.9-177.5,76.1c-16.9,26-28.2,53.4-37.4,83.6c-0.9,3.3-1.8,7.6-3.7,10.5c-1.8,3.3-0.7-8.8-0.7-9.4 c1.5-12.5,4.1-24.5,7.2-36.6C32.9,90.9,74.9,37.3,135.3,12.7z M216,128.3c0,27.3-22.1,49.5-49.4,49.5s-49.4-22.1-49.4-49.5 s22.1-49.5,49.4-49.5S216,100.9,216,128.3z'
        />
      </g>
    </g>
  </svg>,
  <svg
    key='Glassdoor'
    className='w-40 fill-current text-gray-500'
    viewBox='0 0 1200 360'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1153.99 143.55H1199.38C1199.72 143.55 1200 143.25 1200 142.88V98.12C1199.99 87.18 1196.37 78.28 1189.04 72.06C1182.3 66.34 1172.18 62.89 1158.65 62.21C1158.31 62.19 1158.03 62.48 1158.03 62.84V79.72C1158.03 80.05 1158.28 80.32 1158.59 80.35C1170.46 81.18 1179.49 85.01 1179.49 98.35L1153.99 98.36C1153.65 98.36 1153.37 98.66 1153.37 99.03V142.89C1153.37 143.25 1153.65 143.55 1153.99 143.55ZM172.19 179.78H117.15C116.29 179.78 115.74 180.55 115.74 181.31V210.87C115.74 211.8 116.44 212.4 117.15 212.4H136.7V236.2C136.7 253.9 132.38 263.4 117.15 263.4C104.43 263.4 95.4 255.69 95.4 231.71V162.6C95.4 139.64 102.24 128.88 117.39 128.88C131.05 128.88 136.62 137.27 136.62 152.94V161.84C136.62 162.77 137.33 163.36 138.04 163.36H171.88C172.74 163.36 173.29 162.6 173.29 161.84V151.4C173.6 114.22 153.82 94.56 118.02 94.56C82.22 94.56 58.9 115.83 58.9 160.56V234.51C58.9 278.56 86.06 297.71 116.21 297.71C149.97 297.71 173.52 284.41 173.52 235.19V181.22C173.534 180.845 173.405 180.478 173.157 180.195C172.91 179.913 172.564 179.735 172.19 179.7V179.78ZM277.55 258.54H224.63V99.79C224.63 98.85 223.93 98.26 223.22 98.26H189.92C189.06 98.26 188.52 99.02 188.52 99.79V292.68C188.52 293.61 189.22 294.2 189.92 294.2H277.47C278.33 294.2 278.88 293.44 278.88 292.68V260.15C278.88 259.22 278.18 258.62 277.47 258.62H277.55V258.54ZM774.85 161.06C774.85 116.59 797.69 94.9 832.63 94.9C867.1 94.9 890.26 116.67 890.1 161.06V231.54C890.1 276.61 868.67 297.36 832.63 297.36C796.59 297.36 774.85 277.03 774.85 231.54V161.06ZM832.63 263.56C847.23 263.56 853.28 252.89 853.28 230.19V162.67C853.28 139.97 847.39 128.96 832.63 128.96C817.87 128.96 811.98 140.39 811.98 162.67V230.19C811.98 252.98 818.03 263.56 832.63 263.56ZM961.95 94.9C927.01 94.9 904.16 116.59 904.16 161.06V231.54C904.16 277.04 925.91 297.36 961.95 297.36C997.99 297.36 1019.42 276.61 1019.42 231.54V161.06C1019.58 116.67 996.42 94.9 961.95 94.9ZM982.6 230.2C982.6 252.9 976.55 263.57 961.95 263.57C947.35 263.57 941.3 252.98 941.3 230.2V162.68C941.3 140.4 947.19 128.97 961.95 128.97C976.71 128.97 982.6 139.97 982.6 162.68V230.2ZM652.85 98.2H702.78V98.37C736.54 98.37 761.98 116.92 761.98 162.67V229.85C761.98 275.17 737.17 294.15 702.38 294.15H652.85C652.14 294.15 651.43 293.55 651.43 292.62V99.9C651.43 99.05 651.98 98.2 652.85 98.2ZM700.82 258.48C715.89 258.48 725.32 248.14 725.32 224L725.39 224.08V165.21C725.39 140.81 715.5 130.98 700.5 130.98H686.76V258.48H700.82ZM470.78 94.56H470.23C435.84 94.56 417.71 115.74 417.71 147.51C417.71 180.58 439.07 195.97 456.69 208.66L460.1 211.13L464.19 214.1L464.2 214.11L464.21 214.12C476.65 223.12 486.25 230.06 486.25 245.35C486.25 258.15 478.4 263.23 469.29 263.48C459.24 263.73 451.94 255.43 451.94 245.01V228.15C451.944 227.898 451.898 227.648 451.805 227.414C451.712 227.181 451.574 226.967 451.398 226.787C451.223 226.607 451.013 226.463 450.782 226.364C450.55 226.265 450.302 226.213 450.05 226.21H417.86C416.76 226.21 415.98 227.05 415.98 228.16V245.26C415.98 279.06 434.98 297.79 468.43 297.79C501.87 297.79 522.13 278.64 522.13 245.01C522.13 209.99 501.39 194.86 483.32 181.66L482.72 181.22C480.746 179.776 478.759 178.35 476.76 176.94C464.38 168.14 452.88 159.97 452.88 147.25C452.88 134.63 460.88 128.7 470.15 128.7C480.13 128.7 487.19 136.41 487.19 146.58V161.48C487.19 162.58 488.06 163.43 489.08 163.43H521.27C522.37 163.43 523.15 162.59 523.15 161.49V147C523.23 113.8 503.21 94.73 470.78 94.56ZM586.41 94.56H586.96C619.39 94.73 639.33 113.79 639.33 147V161.49C639.33 162.59 638.55 163.43 637.45 163.43H605.25C604.999 163.426 604.752 163.373 604.521 163.273C604.291 163.174 604.083 163.03 603.908 162.849C603.734 162.669 603.596 162.456 603.504 162.223C603.412 161.99 603.366 161.741 603.37 161.49V146.58C603.37 136.41 596.31 128.7 586.33 128.7C577.07 128.7 569.06 134.63 569.06 147.25C569.06 159.96 580.56 168.14 592.94 176.94C594.92 178.34 596.92 179.77 598.9 181.22L599.5 181.66C617.58 194.86 638.31 209.99 638.31 245.01C638.31 278.64 618.05 297.79 584.61 297.79C551.16 297.79 532.16 279.07 532.16 245.27V228.15C532.16 227.05 532.95 226.21 534.04 226.21H566.24C567.26 226.21 568.12 227.05 568.12 228.16V245C568.12 255.42 575.42 263.72 585.47 263.47C594.57 263.22 602.43 258.13 602.43 245.34C602.43 230.04 592.83 223.11 580.4 214.11C579.06 213.14 577.68 212.15 576.29 211.11L572.91 208.67L572.88 208.65C555.25 195.96 533.88 180.57 533.88 147.5C533.88 115.73 552.03 94.55 586.41 94.55V94.56ZM1141.11 158.54V142.36C1141.11 117.71 1122.11 98.31 1100.28 98.31H1035.43C1034.65 98.31 1034.02 98.99 1034.02 99.83V292.56C1034.02 293.4 1034.65 294.08 1035.43 294.08H1067.15C1068.01 294.08 1068.56 293.32 1068.56 292.56V212.33H1084.11C1098.56 212.33 1103.11 218.09 1103.11 232.75V292.39C1103.11 293.32 1103.82 293.91 1104.52 293.91H1137.26C1137.66 293.9 1138.03 293.735 1138.31 293.452C1138.59 293.168 1138.75 292.787 1138.75 292.39V233.85C1138.75 213.85 1133.65 201.06 1120.62 195.81C1133.73 190.05 1141.11 178.53 1141.11 158.54ZM1105.62 165.32C1105.62 173.36 1099.65 179.8 1092.27 179.8H1068.17V130.84H1092.27C1099.65 130.84 1105.62 137.28 1105.62 145.24V165.32ZM334.62 98.31H368.39C369.02 98.31 369.64 98.81 369.8 99.58L413.61 292.05C414.01 293.15 413.21 294.17 412.2 294.17H379.85C379.3 294.17 378.59 293.66 378.44 292.89L371.53 258.42H331.17L324.27 292.89C324.221 293.235 324.051 293.551 323.792 293.784C323.532 294.016 323.198 294.149 322.85 294.16H290.5C289.56 294.16 288.85 293.15 289.09 292.05L333.2 99.58C333.233 99.2281 333.397 98.9017 333.661 98.6662C333.924 98.4306 334.267 98.3034 334.62 98.31ZM351.04 159.47L337.69 226.06H364.69L351.35 159.47L351.19 160.4L351.04 159.47ZM46 98.27H0.62C0.28 98.27 0 98.57 0 98.93V142.78C0 143.15 0.28 143.45 0.62 143.45H26.12C26.12 156.8 17.09 160.63 5.22 161.46C5.06352 161.473 4.91799 161.545 4.81368 161.663C4.70938 161.78 4.65433 161.933 4.66 162.09V178.98C4.66 179.33 4.95 179.62 5.28 179.6C18.81 178.92 28.93 175.47 35.67 169.75C43 163.53 46.62 154.63 46.63 143.69V98.93C46.63 98.56 46.35 98.26 46.01 98.26L46 98.27Z'
    />
  </svg>,
  <svg
    key='Care.com'
    className='w-40 fill-current text-gray-500'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 145 40'
  >
    <path
      d='M2.93,10.67c-3.84,5.6-3.69,13.11,.14,18.65,2.46,3.55,6.23,6.1,10.37,7.21,2.99,.8,6.24,.89,9.25-.02,2.19-.67,4.76-2.14,6.15-3.78,.33-.38,.65-.91,.67-1.43,.02-.42-.29-.74-.69-.81-.49-.07-1.05,.33-1.32,.49-.25,.14-.78,.45-1.18,.63-.63,.31-1.3,.54-1.97,.74-4.6,1.34-9.32-1.52-11.49-5.52-.2-.36-.38-.72-.54-1.1-.8-1.87-1.18-3.89-1.32-5.92-.16-2.39,.02-4.8,.71-7.1,.74-2.44,2.08-4.65,3.96-6.36,1-.91,1.72-1.36,2.88-2.15,.36-.25,.72-.42,.63-.81-.11-.51-.6-.56-1.09-.54-.24,0-1.07,.09-1.16,.11-3.62,.38-8.31,1.85-11.6,4.91-.89,.85-1.7,1.81-2.41,2.82Z'
    />
    <path
      d='M109.04,19.9c.04-.74,.81-.87,1.39-.87,1.03,0,1.76,.05,2.91-.4,1.81-.71,3.11-2.39,3.38-4.26,.34-2.37-.96-4.82-3.06-5.74-.05-.02-.18-.09-.24-.11-1.9-.8-4.14-.36-5.74,.96-.6,.49-1.07,1.1-1.45,1.77-1.18,2.19-1.59,4.69-1.48,7.15,.27,5.81,2.95,11.05,8.69,12.98,1.85,.62,3.82,.58,4.99,.27,.87-.22,1.66-.6,2.42-1.07,.74-.45,1.32-.89,2.23-1.54,.45-.33,1.07-.53,1.45,.07,.4,.62-.13,1.54-.49,2.05-.51,.74-1.18,1.38-1.83,2.01-1.95,1.85-4.38,2.97-6.99,3.57-1.99,.45-4.36,.45-6.26,.18-4.52-.63-8.8-3.19-11.56-6.81-1.18-1.54-2.08-3.28-2.68-5.12-1.47-4.67-.78-9.83,1.83-13.98,.87-1.38,1.94-2.64,3.15-3.73,1.74-1.56,5.18-4.47,12.18-4.47,7.91,0,12.03,3.86,13.32,7.62,.81,2.41,.69,5.14-.43,7.46-1.27,2.61-3.73,4.74-8.72,4.71-2.1-.02-3.95-.27-5.81-1.09-.69-.33-1.25-.81-1.21-1.63Z'
    />
    <path
      d='M80.71,31.18v2.41c0,1.14,.24,2.17,1.5,2.59,.25,.09,.43,.24,.4,.53-.05,.33-.31,.42-.6,.43-.22,.02-.42,0-.63,0h-12.2c-.24,0-.49,0-.72-.02-.25-.02-.49-.13-.54-.4-.05-.29,.11-.45,.38-.53,1.23-.38,1.52-1.36,1.52-2.48,0-7.93,.02-16.28,0-24.21,0-1.05-.22-2.06-1.5-2.35-.25-.05-.43-.24-.4-.53,.05-.36,.33-.49,.65-.51,1.21-.09,2.91-.36,4.09-.65,2.41-.6,4.71-1.47,6.97-2.43,.9-.38,1.09-.27,1.09,.65V12.11c.04,2.08,0,18.36,0,19.07Z'
    />
    <path
      d='M25.16,13.71c3,0,5.43-2.43,5.43-5.43s-2.43-5.43-5.43-5.43-5.43,2.43-5.43,5.43,2.43,5.43,5.43,5.43Z'
    />
    <path
      d='M43.07,13.71c3,0,5.43-2.43,5.43-5.43s-2.43-5.43-5.43-5.43-5.43,2.43-5.43,5.43,2.43,5.43,5.43,5.43Z'
    />
    <path
      d='M87.95,13.71c3,0,5.43-2.43,5.43-5.43s-2.43-5.43-5.43-5.43-5.43,2.43-5.43,5.43,2.43,5.43,5.43,5.43Z'
    />
    <path
      d='M133.38,37.14c3,0,5.43-2.43,5.43-5.43s-2.43-5.43-5.43-5.43-5.43,2.43-5.43,5.43,2.43,5.43,5.43,5.43Z'
    />
    <path
      d='M61.82,22.06c0,3.66-.02,7.57-.02,11.25,0,1.29,.09,2.5,1.63,2.95,.24,.07,.33,.27,.29,.51-.04,.2-.18,.33-.36,.36-.24,.04-.47,.05-.72,.05-3.58,0-6.91-.04-10.5,0-.81,0-1.09-.22-1.09-1.09,0-.42,.02-.78,0-1.27,0-.27-.02-.62-.33-.72-.31-.11-.51,.16-.71,.36-1,1.01-2.1,1.68-3.46,2.19-4.27,1.59-10.46-.62-12.36-4.44-1.72-3.46-.74-7.28,2.39-9.71,2.06-1.61,4.34-2.64,6.68-3.91,1.9-1.1,3.8-2.17,5.48-3.62,3.55-3.08,3.82-7.32,.67-10.79-.45-.49-.34-1.03,.33-1.1,3.85-.47,7.55-.29,10.44,2.79,1.34,1.43,1.66,3.1,1.65,5.12-.05,3.68-.02,7.37-.02,11.06Zm-10.88,1.34v-5.12c0-.63,.05-.89-.67-.45-1.66,.98-3.28,2.03-4.69,3.33-2.17,2.03-3.47,4.45-3.49,7.44-.02,2.43,1.41,4.47,3.38,4.8,2.66,.45,5.37-1.97,5.45-4.94,.05-1.68,.02-3.37,.02-5.05Z'
    />
    <path
      d='M140.69,37.17h.33v-2.35h.84v-.29h-2v.29h.83v2.35Z'
    />
    <path
      d='M144.54,37.17h.33v-2.64h-.47l-.82,2.01-.82-2.01h-.47v2.64h.33v-2.19l.89,2.19h.13l.9-2.19v2.19Z'
    />
  </svg>,
  <svg
    key='Google'
    className='w-40 fill-current text-gray-500'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 272 92'
    width='272'
    height='92'
  >
    <path d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z' />
    <path d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z' />
    <path d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z' />
    <path d='M225 3v65h-9.5V3h9.5z' />
    <path d='M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z' />
    <path d='M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z' />
  </svg>,
]

// TODO: Do not make location specific, update form to redirect to appropriate location
export const metadata: Metadata = {
  title: 'Apply Now! | Cleaners Wanted',
  description: `Ready to work at the #1 fastest growing home and Airbnb cleaning business? Let us get you more booking in less time!`,
}

export default function Apply() {
  return (
    <Page location='CACHED'>
      <ContentViewTracker
        contentType='page'
        contentName='Apply'
        contentId='apply-page'
      />
      <main className='mb-36 space-y-24'>
        {/* Hero */}
        <section className='bg-white pt-8 lg:pt-12'>
          <div className='mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-0 px-4 py-8 lg:grid lg:grid-cols-6 lg:py-16'>
            <div className='mb-24 max-w-xl place-self-center lg:col-span-3 lg:mb-0 lg:mr-4'>
              <h1 className='mb-4 text-4xl leading-none tracking-tight sm:text-5xl xl:text-6xl'>
                Cleaners wanted!
              </h1>
              <h3 className='mb-4 text-gray-800'>
                Let&apos;s get you
                {' '}
                <mark>more booking</mark>
                {' '}
                in
                {' '}
                <mark>less time</mark>
                .
              </h3>
              <p className='mb-8 max-w-2xl lg:mb-12'>
                {BUSINESS_NAME}
                {' '}
                is looking for hardworking and reliable home cleaners. We
                will fill up your schedule, guarantee payments, and handle
                customer service so you don&apos;t have to. If this sounds like
                what you&apos;re looking for, we want to hear from you!
              </p>
              <Link
                href='#form'
                className='ml-12 items-center justify-center place-self-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
              >
                Apply now
              </Link>
            </div>
            <Image
              className='mb-5 mr-4 w-[650px] rounded-lg lg:col-span-3 lg:my-0'
              src={heroImage}
              alt='Cleaner working in a home'
              style={{ objectFit: 'contain' }}
            />
          </div>
        </section>

        {/* Bonuses */}
        <section>
          <h2 className='mb-4 text-center tracking-tight text-gray-900'>
            Earn more with our bonuses
          </h2>
          <p className='mb-20 text-center text-gray-500'>
            We believe in recognizing and rewarding the hard work and dedication
            of our cleaning professionals.
          </p>
          <BonusesTable />
        </section>

        {/* Trust Badges */}
        <section className='bg-white'>
          <div className='mx-auto max-w-screen-xl p-4 lg:py-8'>
            <div className='flex flex-col justify-between gap-12 text-gray-500 md:flex-row lg:mt-0'>
              {badges.map(badge => (
                <div key={badge.key} className='flex items-center justify-center'>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className='text-center'>
          <h2 className='mb-4 text-center tracking-tight text-gray-900'>
            Tell us about yourself!
          </h2>
          <p>
            Answer a few questions and let&apos;s schedule a time to talk further.
          </p>
          <ApplyForm />
        </section>
      </main>
    </Page>
  )
}
