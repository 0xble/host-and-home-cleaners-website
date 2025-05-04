import type { Metadata } from 'next'

import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import { BUSINESS_NAME, DOMAIN, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Understand our Terms of Service that protect both customers and our business. Clear policies and guidelines for using our professional cleaning services.',
}

export default function TermsOfService() {
  return (
    <main className="prose mx-auto my-32 max-w-2xl prose-headings:font-serif prose-strong:font-serif px-6">
      <ContentViewTracker
        contentType="legal"
        contentName="Terms of Service"
        contentId="terms-of-service"
      />
      <h1 className="text-center">
        {BUSINESS_NAME}
        {' '}
        <br />
        {' '}
        Terms of Service
      </h1>
      <p>
        Please read these Terms of Service (&quot;Terms&quot;) carefully before
        using the
        {' '}
        {DOMAIN}
        {' '}
        website (&quot;Website&quot;) or booking any cleaningd
        services (&quot;Services&quot;) offered by
        {' '}
        {BUSINESS_NAME}
        {' '}
        (&quot;us&quot;,
        &quot;we&quot;, or &quot;our&quot;). Your access to and use of the
        Website and our Services is conditioned upon your acceptance of and
        compliance with these Terms. By accessing or using the Website and/or
        our Services, you agree to be bound by these Terms. If you disagree with
        any part of the Terms, then you do not have permission to access the
        Website or use our Services.
      </p>
      <p>
        Your access to and use of the Website and our Services is conditioned
        upon your acceptance of and compliance with these Terms. By accessing or
        using the Website and/or our Services, you agree to be bound by these
        Terms. If you disagree with any part of the Terms, then you do not have
        permission to access the Website or use our Services.
      </p>
      <h2>Eligibility</h2>
      <p>
        If you are a
        {' '}
        {BUSINESS_NAME}
        {' '}
        LLC potential customer or current customer or
        previous customer, or just visiting our website, these terms of service
        applies to you.
      </p>
      <p>
        By using our Website and Services, you represent and warrant that you
        are at least 18 years of age and have the legal capacity to enter into a
        binding contract.
      </p>
      <h2>Terms of Service</h2>
      <p>
        The Terms of Service is an agreement between
        {' '}
        {BUSINESS_NAME}
        {' '}
        and the client.
        {' '}
        {BUSINESS_NAME}
        {' '}
        may employ both W2 employees and 1099 independent contractors to
        provide cleaning services. This agreement outlines the terms under which
        these services are provided.
      </p>
      <p>The parties hereby agree as follows:</p>
      <ol>
        <li>
          <strong>Payment:</strong>
          {' '}
          Payment is due at the time service is
          scheduled. Client may provide Company with a valid credit card to keep
          on file for billing. Client is responsible for and agrees to pay
          Company for the full cost of Client's requested services. Without
          exception there are no refunds for the cleaning service.
        </li>
        <li>
          <strong>Cancellation:</strong>
          {' '}
          Failure to notify
          {BUSINESS_NAME}
          {' '}
          twenty-four (24) hours in advance of cancellation of any
          requested service will result in a $50 fee charged for the scheduled
          visit. There are no refunds for the cancellation charge unless the
          client has been excused of the $50 fee due to an emergency.
        </li>
        <li>
          <strong>Lock Out or No-Show:</strong>
          {' '}
          It is the responsibility of
          Client to ensure access for cleaning. If Client is not available or
          other access arrangements have not been made and the Service Provider
          is unable to enter, there will be a $50 lock-out charge. There are no
          refunds for the lock out charge unless the client has been excused of
          the $50 fee due to an emergency.
        </li>
        <li>
          <strong>Direct Hiring Prohibited:</strong>
          {' '}
          Client agrees not to
          directly engage the services of any of the Company&apos;s Service
          Providers during the term of this Agreement and for a period of nine
          (9) months after termination of services without informing Company of
          the scheduled services. Should services commence or additional
          services be provided without informing Company, Client agrees to pay
          Company $5,000 as a finder&apos;s fee.
        </li>
        <li>
          <strong>Performance of Services:</strong>
          {' '}
          Both W2 employees and
          independent contractors working as Service Providers represent that
          they possess the qualifications, ability, and experience to perform
          all services requested by and rendered to the Client. W2 employees
          operate under the supervision of
          {BUSINESS_NAME}
          , while independent contractors operate independently.
        </li>
        <li>
          <strong>Right to Terminate Service for Safety or Comfort:</strong>
          {' '}
          Service Providers have the right to terminate the service and leave
          the premises immediately if they feel unsafe or uncomfortable due to
          the client&apos;s behavior, the condition of the premises, or any
          other reason. In such cases, the client will be responsible for paying
          for the time spent by the Service Provider up until the point of
          termination.
          {' '}
          {BUSINESS_NAME}
          {' '}
          will work with the client to address any concerns
          and, if appropriate, schedule a follow-up service with a different
          Service Provider.
        </li>
        <li>
          <strong>Acceptance of Terms:</strong>
          {' '}
          Client understands and agrees
          that Client's engagement or utilization of the services of a Service
          Provider of the Company will constitute Client's acceptance of the
          terms and conditions of this Agreement even if Client does not return
          this executed Agreement to Company.
        </li>
        <li>
          <strong>Termination:</strong>
          {' '}
          Client reserves the right to replace or
          terminate the Service Provider for any reason.
        </li>
        <li>
          <strong>Attorney's Fees:</strong>
          {' '}
          Client agrees to pay all reasonable
          costs, including, but not limited to, attorney's fees incurred by the
          Company to enforce any provision in this Agreement.
        </li>
        <li>
          <strong>Governing Law/Jurisdiction:</strong>
          {' '}
          This Agreement shall be
          governed by and construed in accordance with the laws of the state that the service is located in. Any action or proceeding commenced regarding this Agreement
          or the subjects herein shall be brought in the same County.
        </li>
        <li>
          <strong>Consent for Use of Electronic Signatures:</strong>
          {' '}
          This Agreement may be executed by original, facsimile, and electronic signatures, each of which when affixed shall be deemed to be an original that is enforceable against the executing party. Client accepts that the completion of the online booking form shall serve as an electronic signature.
        </li>
        <li>
          <strong>Refund Policy:</strong>
          {' '}
          Without exception there are no refunds
          for the cleaning service. In the event the signed customer claims a
          chargeback on their credit or debit card for the services that were
          provided by
          {BUSINESS_NAME}
          , and the card issuer determines that the customer has committed
          fraud by requesting a charge back, the signed customer shall pay
          Liquidated Damages to the Company at the amount of $750.00 in addition
          to the cost of service per occurrence.
        </li>
        <li>
          <strong>Privacy Policy:</strong>
          {' '}
          We will only share your personal
          information with third parties if it is necessary to provide our
          cleaning services or if we are required to do so by law. We may share
          your information with the following third parties: Our employees or
          independent contractors, Our payment processing partners, and other
          service providing software partners. Digital photographs may be taken
          on scene for internal records or posted on social media in order to
          attract new customers and spread the "
          {BUSINESS_NAME}
          {' '}
          Spirit." order to attract
          new customers and spread the "
          {BUSINESS_NAME}
          {' '}
          Spirit." Furthermore, we respect
          your privacy and will not share any of your private information
          publicly without your consent.
        </li>
        <li>
          <strong>Opt in for SMS using our Toll Free numbers:</strong>
          {' '}
          When
          receiving SMS messages from
          {BUSINESS_NAME}
          {' '}
          or from any of our toll free numbers Msg & data rates may
          apply. For help, contact
          {' '}
          {EMAIL.SUPPORT}
          . When receiving incoming messages, you may opt out by replying
          "Stop."
        </li>
      </ol>
      <h2>WAIVER OF LIABILITY AND HOLD HARMLESS AGREEMENT</h2>
      <p>
        I, the customer who electronically signed, hereby acknowledge and agree
        to the following: The Coronavirus ("COVID-19") pandemic is a present
        risk to human health. COVID-19 is highly contagious and has a mortality
        rate potentially greater than the flu. COVID-19 can spread easily and
        exponentially. While people of all ages are at risk of catching
        COVID-19, persons especially at risk are those with compromised immune
        systems and the elderly. Persons over 65 years of age may be at
        particular risk as well. I acknowledge and understand that the
        circumstances regarding COVID-19 are changing from day to day and that,
        accordingly, the CDC guidelines are regularly modified and updated and I
        accept full responsibility for familiarizing myself with the most recent
        updates.
      </p>
      <p>
        Notwithstanding the risks associated with COVID-19, which I readily
        acknowledge, that I am receiving a service from
        {' '}
        {BUSINESS_NAME}
        .
      </p>
      <p>
        I shall indemnify, defend, and hold harmless the RELEASEES from and
        against any and all claims, demands, suits, judgments, losses, or
        expenses of any nature whatsoever arising from or out of, or relating
        to, directly or indirectly, my potential and/or actual exposure to
        COVID-19. I declare that I agree to take all recommended and reasonable
        actions to protect myself and others from exposure to COVID-19, and that
        I assume the risk of contracting or spreading COVID-19, as applicable.
      </p>
      <p>
        It is my express intent that this Waiver and Hold Harmless Agreement
        shall bind any assigns and representatives, and shall be deemed as a
        RELEASE, WAIVER, DISCHARGE, AND COVENANT NOT TO SUE the above-named
        RELEASEES. This Agreement and the provisions contained herein shall be
        governed by and construed in accordance with the laws of the state that
        the service is located in. Any action or proceeding commenced regarding
        this Agreement or the subjects herein shall be brought in the same County.
      </p>
      <p>
        I HEREBY KNOWINGLY AND VOLUNTARILY WAIVE ANY RIGHT TO A JURY TRIAL OF
        ANY DISPUTE ARISING IN CONNECTION WITH THIS AGREEMENT.
      </p>
      <p>
        Most discounts are for Deep Clean or first time cleaning only. Discounts
        may be used only 1 time. IN SIGNING THIS AGREEMENT, I ACKNOWLEDGE AND
        REPRESENT THAT I have read the foregoing Waiver of Liability and Hold
        Harmless Agreement, understand it, and sign it voluntarily as my own
        free act and deed; no oral representations, statements, or inducements,
        apart from the foregoing written agreement, have been made to me; I am
        at least eighteen (18) years of age and fully competent; and I execute
        this Agreement for full, adequate and complete consideration fully
        intending to be bound by it.
      </p>
      <p>Terms may change without notice.</p>
      <h2>Booking and Cancellation Policy</h2>
      <p>
        To book our Services, you must provide accurate and complete
        information, including your name, contact information, and payment
        details. You may book our Services through our online booking system or
        by contacting us directly. If you need to cancel or reschedule a booked
        cleaning appointment, you must notify us at least 24 hours in advance.
        Failure to provide sufficient notice may result in a cancellation fee.
      </p>
      <h2>Payments</h2>
      <p>
        Payments for our Services must be made via the payment methods we
        accept, as indicated on our Website. All fees and charges are
        non-refundable unless otherwise stated in these Terms.
      </p>
      <p>
        You agree not to use our Website or Services for any unlawful purpose or
        in any way that could damage, disable, or impair the Website or our
        Services. You also agree not to interfere with any other party&apos;s
        use of the Website or our Services.
      </p>
      <h2>User Conduct</h2>
      <p>
        All content on our Website, including but not limited to text, images,
        logos, and design, is the property of
        {' '}
        {BUSINESS_NAME}
        {' '}
        LLC or its content
        suppliers and is protected by copyright and other intellectual property
        laws. Any unauthorized use of our content is strictly prohibited.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        You agree to indemnify and hold harmless
        {' '}
        {BUSINESS_NAME}
        {' '}
        LLC and its employees,
        contractors, agents, and representatives from and against any and all
        claims, damages, losses, liabilities, costs, and expenses (including
        reasonable attorneys&apos; fees) arising out of or relating to your use
        of our Website or Services, your breach of these Terms, or your
        violation of any applicable laws or regulations.
      </p>
      <h2>Indemnification</h2>
      <p>
        To the maximum extent permitted by law,
        {' '}
        {BUSINESS_NAME}
        {' '}
        LLC shall not be liable
        for any direct, indirect, incidental, special, consequential, or
        punitive damages, or any loss of profits or revenues, whether incurred
        directly or indirectly, or any loss of data, use, goodwill, or other
        intangible losses, resulting from your use of our Website or Services.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of the state that the service is located in, without
        regard to its conflict of law provisions.
      </p>
      <h2>Governing Law</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. By continuing to access or use our Website or
        Services after any revisions become effective, you agree to be bound by
        the revised Terms.
      </p>
      <h2>Changes to the Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. By continuing to access or use our Website or
        Services after any revisions become effective, you agree to be bound by
        the revised Terms.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at
        {' '}
        {EMAIL.SUPPORT}
        . By using our Website and Services, you acknowledge that you
        have read and understand these Terms of Service and agree to be bound by
        them.
      </p>
    </main>
  )
}
