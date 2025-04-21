import type { Metadata } from 'next'

import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import { BUSINESS_NAME, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Host & Home Cleaners protects and handles your personal data, including what we collect, how we use it, and your privacy rights as our customer.',
}

export default function PrivacyPolicy() {
  return (
    <main className="prose mx-auto my-32 max-w-2xl prose-headings:font-serif prose-strong:font-serif px-6">
      <ContentViewTracker
        contentType="legal"
        contentName="Privacy Policy"
        contentId="privacy-policy"
      />
      <h1 className="text-center">
        {BUSINESS_NAME}
        {' '}
        <br />
        {' '}
        Privacy Policy
      </h1>
      <p>Here&apos;s how we protect your data and respect your privacy.</p>
      <h2>Our Role in Your Privacy</h2>
      <p>
        If you are a
        {' '}
        {BUSINESS_NAME}
        {' '}
        customer or subscriber, or just visiting our
        website, this policy applies to you.
      </p>
      <h2>Our Responsibilities</h2>
      <p>
        If you are a registered
        {' '}
        {BUSINESS_NAME}
        {' '}
        customer or a visitor to our website, we
        act as the &quot;data controller&quot; of personal data. This means we
        determine how and why your data are processed.
      </p>
      <h2>Your Responsibilities</h2>
      <ul>
        <li>Read this Privacy Policy.</li>
        <li>
          If you are our customer, please also check the contracts - including
          the Data Processing Agreement available upon request - between us:
          they may contain further details on how we collect and process your
          data.
        </li>
        <li>
          If you provide us with personal information about other people, or if
          others give us your information, we will only use that information for
          the specific reason for which it was provided to us. By submitting the
          information, you confirm that you have the right to authorize us to
          process it on your behalf in accordance with this Privacy Policy.
        </li>
      </ul>
      <h2>When and How We Collect Data</h2>
      <p>
        From the moment you request a quote from
        {' '}
        {BUSINESS_NAME}
        , we start collecting
        data. Sometimes you provide us with data, sometimes data about you is
        collected automatically. Here are more details on when and how we do
        this.
      </p>
      <h3>When Customers Provide Data:</h3>
      <ul>
        <li>
          Data is not collected when a customer requests a quote from
          {' '}
          {BUSINESS_NAME}
          .
        </li>
        <li>
          Data is not collected when
          {BUSINESS_NAME}
          {' '}
          calls the customer.
        </li>
      </ul>
      <h3>
        When Data is Collected by
        {BUSINESS_NAME}
        :
      </h3>
      <ul>
        <li>
          Data may be collected when the customer uses
          {' '}
          {BUSINESS_NAME}
          &apos;s services.
        </li>
        <li>
          Data may be collected when the customer receives emails from
          {' '}
          {BUSINESS_NAME}
          .
        </li>
        <li>
          Data may be collected when the customer engages in a chat with
          {' '}
          {BUSINESS_NAME}
          for customer support.
        </li>
      </ul>
      <h2>Types of Data We Collect</h2>
      <p>
        We collect a variety of types of data to provide and improve our
        services to you. Below are the categories of data we collect:
      </p>
      <h3>Contact Details</h3>
      <ul>
        <li>Your name, email address, role in your company, etc.</li>
      </ul>
      <h3>Financial Information</h3>
      <ul>
        <li>
          Your bank account number, sort code, credit/debit card details, etc.
        </li>
      </ul>
      <h3>Metadata from Your Code Repositories</h3>
      <ul>
        <li>
          The name of your code repositories/projects, APIs & databases, URLs to
          GitHub/GitLab files, last commit date, etc.
        </li>
      </ul>
      <h3>Metadata from Your Teams</h3>
      <ul>
        <li>
          Your data sources & destinations, types of data, business processes,
          hosting location, security measures, etc.
        </li>
      </ul>
      <h3>Data That Identifies You</h3>
      <ul>
        <li>
          Your IP address, login information, browser type and version, time
          zone setting, browser plug-in types, geolocation information about
          where you might be, operating system and version, etc.
        </li>
      </ul>
      <h3>Web Browsing Data</h3>
      <ul>
        <li>
          Your URL clickstreams (the path you take through our site), pages
          viewed, page response times, download errors, how long you stay on our
          pages, what you do on those pages, how often, and other actions.
        </li>
      </ul>
      <h3>What About Really Sensitive Data?</h3>
      <p>
        We don't collect any &quot;sensitive data&quot; about you (like racial
        or ethnic origin, political opinions, religious/philosophical beliefs,
        trade union membership, genetic data, biometric data, health data, data
        about your sexual life or orientation, and offenses or alleged
        offenses).
      </p>

      <h3>What About Children's Data?</h3>
      <p>
        Bearer is a business-to-business service directed to and intended for
        use only by those who are 18 years of age or over. We do not target or
        service children, and we do not knowingly collect any personal data from
        any person under 16 years of age.
      </p>

      <h3>What About Children's Data?</h3>
      <p>
        Bearer is a business-to-business service directed to and intended for
        use only by those who are 18 years of age or over. We do not target
        {BUSINESS_NAME}
        {' '}
        at children, and we do not knowingly collect any personal data
        from any person under 16 years of age.
      </p>

      <h2>How and Why We Use Your Data</h2>
      <p>There are two legal bases under which we use data:</p>
      <h3>Consent</h3>
      <p>
        You have given clear consent for us to process your personal data for a
        specific purpose. You can change your mind! If you have previously given
        consent to our processing your data, you can freely withdraw such
        consent at any time. You can do this by emailing us at
        {' '}
        {EMAIL.SUPPORT}
        . If you
        do withdraw your consent, and if we do not have another legal basis for
        processing your information, then we will stop processing your personal
        data. If we do have another legal basis for processing your information,
        then we may continue to do so subject to your legal rights.
      </p>

      <h3>Legitimate Interests</h3>
      <p>
        Processing your data is necessary for our legitimate interests or the
        legitimate interests of a third party, provided those interests are not
        outweighed by your rights and interests. These legitimate interests are:
      </p>
      <ul>
        <li>
          Gaining insights from your behavior on our website or in our app.
        </li>
        <li>
          Delivering, developing, and improving the
          {BUSINESS_NAME}
          {' '}
          service.
        </li>
        <li>
          Enabling us to enhance, customize, or modify our services and
          communications.
        </li>
        <li>Determining whether marketing campaigns are effective.</li>
        <li>Enhancing data security.</li>
      </ul>
      <p>
        In each case, these legitimate interests are only valid if they are not
        outweighed by your rights and interests.
      </p>

      <h3>Data Protection Law</h3>
      <p>
        Data protection law means that we can only use your data for certain
        reasons and where we have a legal basis to do so. Here are the reasons
        for which we process your data:
      </p>
      <h4>
        Keeping
        {BUSINESS_NAME}
        {' '}
        Running
      </h4>
      <p>Login and authentication, processing payments.</p>
      <p> The legal basis for doing so is legitimate interests.</p>

      <h4>
        Improving
        {BUSINESS_NAME}
      </h4>
      <p>
        Product analytics, heat mapping our site, testing features, and session
        replay.
      </p>
      <p>The legal basis for doing so is legitimate interests.</p>

      <h4>Customer Support</h4>
      <p>
        Notifying you of any changes to our service, solving issues via live
        chat support, phone, or email including any bug fixing.
        {' '}
      </p>
      <p>The legal basis for doing so is legitimate interests.</p>

      <h4>Marketing Purposes (With your Consent)</h4>
      <p>
        Sending you emails and messages about new features, products and
        services, and content.
      </p>
      <p>The legal basis for doing so is consent.</p>

      <h2>Your Privacy Choices and Rights</h2>

      <p>
        Your privacy is important to us, and we give you certain choices and
        rights regarding how we use your data. Here&apos;s how you can exercise
        those rights:
      </p>

      <h3>Choosing Not to Provide Personal Data</h3>
      <p>
        If you choose not to provide us with personal data, you can still use
        the website and browse its pages, but we will not be able to process
        transactions without personal data.
      </p>

      <h3>Turning Off Cookies in Your Browser</h3>
      <p>
        You can block cookies by activating a setting on your browser that
        allows you to refuse cookies. You can also delete cookies through your
        browser settings. If you turn off cookies, you can continue to use the
        website, but certain services may not work effectively.
      </p>

      <h3>Opting Out of Marketing</h3>
      <p>
        We will inform you before collecting your data if we intend to use your
        data for marketing and if third parties are involved. You can opt out
        from marketing by emailing us at
        {' '}
        {EMAIL.SUPPORT}
      </p>

      <h3>Accessing Information We Hold About You</h3>
      <p>
        You have the right to access information we hold about you. This
        includes the right to ask us supplementary information about the
        categories of data we're processing, the purposes of data processing,
        the categories of third parties to whom the data may be disclosed, how
        long the data will be stored, and your other rights regarding our use of
        your data.
      </p>

      <h3>Correcting Inaccurate Personal Data</h3>
      <p>
        You have the right to make us correct any inaccurate personal data about
        you.
      </p>

      <h3>Objecting to Profiling or Automated Decisions</h3>
      <p>
        You can object to us using your data for profiling you or making
        automated decisions about you.
      </p>

      <h3>Porting Your Data to Another Service</h3>
      <p>
        We will give you a copy of your data in CSV or JSON so that you can
        provide it to another service. If it is technically possible, we will
        directly transfer the data to the other service for you.
      </p>

      <h3>Right to Be &quot;Forgotten&quot;</h3>
      <p>
        You have the right to be &quot;forgotten&quot; by us. You can do this by
        asking us to erase any personal data we hold about you, if it is no
        longer necessary for us to hold the data for purposes of your use of the
        website.
      </p>

      <h3>Lodging a Complaint</h3>
      <p>
        If you have a complaint regarding our use of your data, please tell us
        first so we have a chance to address your concerns.
      </p>

      <h2>Your Privacy Choices and Rights</h2>

      <p>You have several rights and choices regarding your data:</p>

      <ul>
        <li>
          <strong>Not Providing Data:</strong>
          {' '}
          You can choose not to provide us
          with personal data. If you choose to do so, you can continue to use
          the website and browse its pages, but we will not be able to process
          transactions without personal data.
        </li>
        <li>
          <strong>Turning Off Cookies:</strong>
          {' '}
          You can turn off cookies in your
          browser by changing its settings. You can block or delete cookies
          through your browser settings. If you turn off cookies, certain
          services may not work effectively.
        </li>
        <li>
          <strong>Opting Out of Marketing:</strong>
          {' '}
          You can ask us not to use
          your data for marketing. We will inform you before collecting your
          data if we intend to use your data for marketing and if third parties
          are involved. Opt out by emailing us.
        </li>
        <li>
          <strong>Accessing Your Information:</strong>
          {' '}
          You have the right to
          access information we hold about you. This includes information about
          how we use your data, the categories of data we process, and your
          rights regarding our use of your data.
        </li>
        <li>
          <strong>Correcting Data:</strong>
          {' '}
          You have the right to make us
          correct any inaccurate personal data about you.
        </li>
        <li>
          <strong>Objecting to Data Use:</strong>
          {' '}
          You can object to us using
          your data for profiling or making automated decisions about you.
        </li>
        <li>
          <strong>Porting Data:</strong>
          {' '}
          You have the right to port your data to
          another service. We will provide your data in a commonly used format.
        </li>
        <li>
          <strong>Being Forgotten:</strong>
          {' '}
          You have the right to be
          &quot;forgotten&quot; by us. You can do this by asking us to erase any
          personal data we hold about you.
        </li>
        <li>
          <strong>Lodging Complaints:</strong>
          {' '}
          You have the right to lodge a
          complaint regarding our use of your data. Please contact us at
          {' '}
          {EMAIL.SUPPORT}
          {' '}
          first to give us the opportunity to address your concerns.
        </li>
      </ul>

      <h2>Data Security and Storage</h2>

      <p>
        <strong>How secure is the data we collect?</strong>
        {' '}
        We have physical,
        electronic, and managerial procedures to safeguard and secure the
        information we collect. However, no data transmission is guaranteed to
        be 100% secure. You are responsible for keeping your username and
        password secret and safe.
      </p>

      <p>
        <strong>Where do we store the data?</strong>
        {' '}
        The personal data we
        collect is primarily stored in our Amazon Web Services servers in
        Ireland and processed in the countries we live in, including countries
        outside the EEA. We take steps to ensure that your privacy rights
        continue to be protected as outlined in this Privacy Policy when
        transferring outside the EEA.
      </p>

      <p>
        <strong>How long do we store your data?</strong>
        {' '}
        We archive and stop
        actively using any personally identifiable information about you within
        3 months from the last time you used
        {BUSINESS_NAME}
        . We delete your personal data from our archives no later than 6
        years from the last time you used
        {BUSINESS_NAME}
        {' '}
        or as agreed in a separate
        contract.
      </p>

      <h2>Third Parties and Cookies</h2>

      <p>
        We partner with third parties who we believe are the best at what they
        do. When necessary, your data is shared with them under strict
        conditions. Any data transfers to the US are encrypted and consist of
        insensitive personal data.
      </p>

      <h3>Analytics and Tracking Tools</h3>
      <p>
        We use the following analytics and tracking tools to improve our website and services:
      </p>
      <ul>
        <li>
          <strong>Google Analytics:</strong>
          {' '}
          We use Google Analytics to understand how visitors interact with our website. This tool collects information such as pages visited, time spent on pages, and user interactions. The data is used to improve our website's performance and user experience. Google Analytics uses cookies and similar technologies to collect this information.
        </li>
        <li>
          <strong>Facebook Pixel:</strong>
          {' '}
          We use Facebook Pixel to measure the effectiveness of our advertising campaigns and to understand how visitors interact with our website. This tool helps us show relevant advertisements to you on Facebook and Instagram. Facebook Pixel uses cookies and similar technologies to collect this information.
        </li>
      </ul>

      <p>
        <strong>Managing Your Privacy Settings:</strong>
        {' '}
        You can control how these tools collect and use your data:
      </p>
      <ul>
        <li>
          For Google Analytics: You can opt-out by installing the
          {' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </li>
        <li>
          For Facebook Pixel: You can opt-out of Facebook's use of cookies and similar technologies by visiting
          {' '}
          <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer">
            Facebook Ad Preferences
          </a>
          .
        </li>
      </ul>

      <p>
        <strong>Blocking Cookies:</strong>
        {' '}
        You can block cookies by activating a
        setting on your browser to refuse cookies. You can also delete cookies
        through your browser settings. Please note, disabling cookies may affect
        the functionality of our website and our ability to provide you with a
        personalized experience.
      </p>
    </main>
  )
}
