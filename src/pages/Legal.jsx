import { useParams, Navigate } from 'react-router-dom'
import { PageHero } from '../components/Shared'
import { Reveal } from '../components/Motion'
import { brand } from '../data/site'

const pages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      ['What we collect', 'When you request a quote or contact us, we collect the name, email, phone number and project details you choose to share. We do not collect payment information through this website.'],
      ['How we use it', 'Your details are used only to respond to your enquiry, prepare quotations and coordinate projects. We never sell or share your information with third parties for marketing.'],
      ['Cookies', 'This website does not use tracking cookies. Any analytics are aggregate and anonymous.'],
      ['Your rights', `You may request a copy or deletion of your data at any time by writing to ${brand.email}.`],
    ],
  },
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    sections: [
      ['Use of this site', 'Content on this website describes Propel Sports Infra products and services in general terms. Specifications are indicative; final project specifications are confirmed in writing with your quotation.'],
      ['Quotations & orders', 'All quotations are valid for 30 days unless stated otherwise. Orders are confirmed only upon written acceptance and receipt of the agreed advance.'],
      ['Intellectual property', 'All text, imagery and brand assets on this site belong to Propel Sports Infra Pvt Ltd and may not be reproduced without permission.'],
      ['Liability', 'Product performance depends on correct base preparation and installation. Our liability is limited to the terms stated in the individual supply or installation contract.'],
    ],
  },
  'cancellations-and-refunds': {
    title: 'Cancellations & Refunds',
    sections: [
      ['Order cancellation', 'Orders may be cancelled in writing before material dispatch or production batching. Once custom-coloured material has been produced, cancellation is not possible.'],
      ['Refunds', 'Advances are refundable, less any costs already incurred (custom production, logistics, site work), if cancellation is requested before dispatch. Refunds are processed within 14 working days.'],
      ['Defective material', 'Material verified as defective at delivery will be replaced or refunded in full, including logistics, at our cost.'],
      ['Contact', `For any cancellation or refund request, write to ${brand.email} with your order reference.`],
    ],
  },
}

export default function Legal() {
  const { page } = useParams()
  const content = pages[page]
  if (!content) return <Navigate to="/" replace />
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={content.title}
        word="Legal"
        crumb={[{ label: content.title }]}
      />
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {content.sections.map(([heading, body], i) => (
            <Reveal key={heading} delay={i * 0.05}>
              <div className="prose">
                <h2>{heading}</h2>
                <p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}