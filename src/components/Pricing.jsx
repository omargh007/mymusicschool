import { useState } from 'react'
import './Pricing.css'

const tiers = {
  monthly: [
    {
      name: 'Individual',
      price: '45', unit: '/lesson',
      note: 'Per lesson · no commitment',
      desc: 'Perfect for students who want flexibility and dedicated one-on-one attention from a specialist.',
      features: ['45–60 min lesson', 'Choose your instructor', 'Online or in-person', 'Free instrument assessment', 'Student portal access'],
      cta: 'Get Started', featured: false,
    },
    {
      name: 'Membership',
      price: '160', unit: '/month',
      note: '4 lessons per month',
      desc: 'Our most popular plan. Consistent weekly lessons with priority scheduling and full event access.',
      features: ['4 lessons per month', 'Priority scheduling', 'Free recital participation', 'Monthly progress reports', 'Sheet music library', 'Pause any month'],
      cta: 'Start Free Trial', featured: true,
    },
    {
      name: 'Group Class',
      price: '25', unit: '/session',
      note: 'Groups of 4–6 students',
      desc: 'An affordable, social way to learn. Small groups build peer motivation and ensemble skills.',
      features: ['Groups of 4–6 students', 'Theory & rhythm focus', 'Ideal for ages 5–14', 'Ensemble performance skills', 'Family discount available'],
      cta: 'Get Started', featured: false,
    },
  ],
  annual: [
    {
      name: 'Individual',
      price: '36', unit: '/lesson',
      note: 'Billed annually · save 20%',
      desc: 'Perfect for students who want flexibility and dedicated one-on-one attention from a specialist.',
      features: ['45–60 min lesson', 'Choose your instructor', 'Online or in-person', 'Free instrument assessment', 'Student portal access'],
      cta: 'Get Started', featured: false,
    },
    {
      name: 'Membership',
      price: '128', unit: '/month',
      note: '4 lessons/mo · billed annually',
      desc: 'Our most popular plan. Consistent weekly lessons with priority scheduling and full event access.',
      features: ['4 lessons per month', 'Priority scheduling', 'Free recital participation', 'Monthly progress reports', 'Sheet music library', 'Pause any month'],
      cta: 'Start Free Trial', featured: true,
    },
    {
      name: 'Group Class',
      price: '20', unit: '/session',
      note: 'Billed annually · save 20%',
      desc: 'An affordable, social way to learn. Small groups build peer motivation and ensemble skills.',
      features: ['Groups of 4–6 students', 'Theory & rhythm focus', 'Ideal for ages 5–14', 'Ensemble performance skills', 'Family discount available'],
      cta: 'Get Started', featured: false,
    },
  ],
}

export default function Pricing() {
  const [mode, setMode] = useState('monthly')
  const data = tiers[mode]

  return (
    <section className="pricing-section" id="pricing">
      <span className="pricing-watermark">04</span>
      <div className="wrap">
        <div className="section-label reveal">Pricing</div>
        <h2 className="section-heading reveal d1">
          Simple, honest<br /><strong>pricing</strong>
        </h2>

        <div className="pricing-toggle-row reveal d2">
          <div className="pricing-toggle">
            <button
              className={`pricing-tab${mode === 'monthly' ? ' active' : ''}`}
              onClick={() => setMode('monthly')}
            >Monthly</button>
            <button
              className={`pricing-tab${mode === 'annual' ? ' active' : ''}`}
              onClick={() => setMode('annual')}
            >Annual</button>
          </div>
          <span className={`save-badge${mode === 'annual' ? ' visible' : ''}`}>
            Save 20%
          </span>
        </div>

        <div className="pricing-cards reveal d3">
          {data.map((tier) => (
            <div
              className={`pricing-card${tier.featured ? ' featured' : ''}`}
              key={tier.name}
            >
              {tier.featured && (
                <div className="featured-ribbon">Most Popular</div>
              )}
              <div className="pricing-card-header">
                <div className="pricing-tier-name">{tier.name}</div>
                <div className="pricing-tier-price">
                  <span className="price-sup">$</span>
                  <span className="price-num">{tier.price}</span>
                  <span className="price-unit">{tier.unit}</span>
                </div>
                <div className="pricing-tier-note">{tier.note}</div>
              </div>
              <p className="pricing-desc">{tier.desc}</p>
              <ul className="pricing-features">
                {tier.features.map(f => (
                  <li key={f}>
                    <span className="feat-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={tier.featured ? 'btn-primary pricing-cta' : 'btn-secondary pricing-cta'}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
