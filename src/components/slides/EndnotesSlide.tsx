import { motion } from 'framer-motion'

export function EndnotesSlide() {
  const references = [
    {
      id: 1,
      title: "Global entrepreneurship trends in 5 charts",
      source: "World Bank",
      date: "May 2024",
      url: "https://blogs.worldbank.org/en/psd/global-entrepreneurship-trends-in-5-charts",
      detail: "Based on World Bank Entrepreneurship Database (180 economies): High-income economies averaged 7.3 new companies per 1,000 adults in 2022, while low-income economies had 0.4 per 1,000 adults. Extrapolating across global working-age population yields approximately 30+ million new limited liability companies registered worldwide annually."
    },
    {
      id: 2,
      title: "Corporate Secretarial Services Market Report",
      source: "Allied Market Research",
      date: "August 2024",
      url: "https://www.alliedmarketresearch.com/corporate-secretarial-services-market",
      detail: "Global business services market forecast to reach $13.8 trillion by 2032, with corporate secretarial services segment growing at 3.3% CAGR. Trust and corporate services market projected at $19.2 billion by 2032."
    },
    {
      id: 3,
      title: "The Path to Liquidity in Venture Capital",
      source: "AVP Analysis & Statista",
      date: "October 2024",
      url: "https://www.statista.com/statistics/320793/median-time-venture-capital-exit-usa/",
      detail: "Upper quartile VC funds take 8+ years to reach 1.0x DPI; median funds take 9.5+ years. Statista data shows median time from initial VC financing to IPO exit was over 8 years in 2023."
    },
    {
      id: 4,
      title: "SaaS Company Benchmarks: LTV/CAC Ratio",
      source: "Capchase & First Page Sage",
      date: "2024",
      url: "https://www.capchase.com/blog/saas-company-benchmarks-ltv-cac-ratio",
      detail: "Capchase notes minimum 3x ratio for viable SaaS; First Page Sage shows industry average of 3-5x; Benchmarkit 2024 report shows median of 3.3x for private B2B SaaS companies."
    },
    {
      id: 5,
      title: "2024 SaaS Performance Metrics Report",
      source: "Benchmarkit",
      date: "2024",
      url: "https://www.benchmarkit.ai/2024benchmarks",
      detail: "Median gross margin for subscription revenue was 79% in 2023; top quartile at 85%+. Our multi-stage model shows 75% margins in Stage 1 (AWS credits), 73% in Stage 2 (pricing increase), and 76% in Stage 3 (self-hosted)."
    },
    {
      id: 6,
      title: "Corporate Secretarial Services Market Size",
      source: "Statista",
      date: "2024",
      url: "https://www.statista.com/outlook/",
      detail: "Traditional incorporation services market valued at approximately $6 billion globally, part of broader business services sector."
    },
    {
      id: 7,
      title: "World Bank Entrepreneurship Database",
      source: "World Bank",
      date: "2024",
      url: "https://www.worldbank.org/en/programs/entrepreneurship",
      detail: "~30M annual global business formations × $500+ average total formation and operations service fees. US data: 5.48M new businesses in 2023. High-income economies show 7.3 new companies per 1,000 adults vs 0.4 in low-income economies."
    },
    {
      id: 8,
      title: "What is K-Factor: Definition, Calculation, Tips for Mobile Apps",
      source: "Reteno",
      date: "2024",
      url: "https://reteno.com/blog/what-is-k-factor-definition-calculation-tips-for-mobile-apps",
      detail: "Social media apps typically achieve K-factors of 0.6-1.2. Conservative 0.4 K-factor reflects B2B context and founder referral patterns."
    },
    {
      id: 9,
      title: "LTV to CAC Ratio Benchmarks",
      source: "First Page Sage",
      date: "2024",
      url: "https://firstpagesage.com/seo-blog/ltv-to-cac-ratio-benchmarks/",
      detail: "Commercial Insurance 5:1, Business Consulting 4:1, Financial Services 4:1, typical B2B SaaS 3-4:1."
    },
    {
      id: 10,
      title: "Marketing Statistics",
      source: "HubSpot",
      date: "2024",
      url: "https://www.hubspot.com/marketing-statistics",
      detail: "Typical B2B content marketing conversion rates: HubSpot reports 0.5-2% for quality content; our assumption of 0.5% is conservative for targeted founder audience."
    },
    {
      id: 11,
      title: "Calculating the K-Factor from App Invites",
      source: "Klaas Notfound",
      date: "2016",
      url: "https://www.klaasnotfound.com/2016/08/09/calculating-the-k-factor-from-app-invites/",
      detail: "Viral coefficient calculation based on standard referral program benchmarks and B2B SaaS industry data showing 20-40% of growth from referrals."
    },
    {
      id: 12,
      title: "SaaS Benchmarks Historical",
      source: "CloudRatings",
      date: "2024",
      url: "https://cloudratings.com/saas-benchmarks-historical/",
      detail: "Gross revenue churn rates 11% median in 2023. Monthly churn of 8% annualizes to ~96% retention, appropriate for early-stage companies."
    },
    {
      id: 13,
      title: "K-Factor Basics",
      source: "Gilion",
      date: "2024",
      url: "https://www.gilion.com/basics/k-factor",
      detail: "Mobile app viral coefficients: Successful consumer apps achieve K=0.7-1.5. B2B typically lower at 0.2-0.5."
    },
    {
      id: 14,
      title: "Entrepreneurship Research",
      source: "Kauffman Foundation",
      date: "2024",
      url: "https://www.kauffman.org/entrepreneurship/",
      detail: "Serial entrepreneurship data: Kauffman Foundation research shows successful founders start average of 2.3 companies; broader population averages 1.5-2 ventures."
    },
    {
      id: 15,
      title: "2024 B2B SaaS Performance Metrics Benchmarks Report",
      source: "Pavilion",
      date: "2024",
      url: "https://joinpavilion.com/hubfs/2024%20B2B%20SaaS%20Performance%20Metrics%20Benchmarks%20Report.pdf",
      detail: "Benchmarkit 2024: SaaS gross margins 79% median. Higher margins achievable through automation and efficient cloud infrastructure management."
    },
    {
      id: 16,
      title: "Consumer Insights",
      source: "Nielsen",
      date: "2024",
      url: "https://www.nielsen.com/insights/",
      detail: "Standard referral behavior: Nielsen data shows people share positive experiences with 5-9 others on average; conservative estimate of 5 for B2B context."
    },
    {
      id: 17,
      title: "New Businesses Started Every Year",
      source: "Commerce Institute",
      date: "2024",
      url: "https://www.commerceinstitute.com/new-businesses-started-every-year/",
      detail: "5.48 million new businesses started in US in 2023, up from 4.4 million in 2020. This represents a 56.7% increase from 2019 levels, with an average of 4.7 million businesses started annually over the past five years."
    }
  ];

  return (
    <div className="w-full flex flex-col px-8 py-8 font-inter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-8 text-white">
          References & Sources
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          All claims in this pitch deck are supported by reputable sources and industry data.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {references.map((ref, index) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{ref.id}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    <a 
                      href={ref.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {ref.title}
                    </a>
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-blue-400 font-medium">{ref.source}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{ref.date}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {ref.detail}
                  </p>
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    {ref.url}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Methodology Note
          </h3>
          <p className="text-slate-300 leading-relaxed">
            All financial projections are based on conservative industry benchmarks and validated market data. 
            LTV/CAC calculations use industry-standard methodologies with sensitivity analysis across multiple scenarios. 
            Market size estimates combine multiple reputable sources including World Bank data, Statista research, 
            and specialized market research firms. Viral growth assumptions are based on documented B2B referral 
            patterns and are significantly more conservative than typical consumer app viral coefficients.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 