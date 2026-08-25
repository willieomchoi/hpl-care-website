import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Globe,
  HeartPulse,
  Info,
  IdCard,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Printer,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';

const navItems = [
  ['참가자격', '/'],
  ['자격 미리 확인', '/'],
  ['제출서류', 'documents'],
  ['자주 묻는 질문', 'faq'],
  ['문의하기', 'contact'],
];

const preparationCards = [
  { icon: ShieldCheck, title: '본인인증 수단', text: '간편인증, 공동인증서, 금융인증서 등' },
  { icon: Smartphone, title: '본인 명의 휴대전화', text: '간편인증 또는 앱 이용 시 필요할 수 있습니다.' },
  { icon: Printer, title: '출력 가능한 환경', text: '발급 후 서류를 출력할 수 있는 PC·프린터 또는 출력 가능한 장소' },
  { icon: IdCard, title: '신분증', text: '행정복지센터 방문 신청 시 본인 확인을 위해 지참' },
  { icon: FileText, title: '사업 공고문', text: '전체 구비서류 및 서류 발급일 기준 등을 다시 확인' },
];

const pcSteps = [
  { title: '국민건강보험공단 접속', text: '공식 홈페이지로 이동합니다.' },
  { title: '로그인 및 본인인증', text: '간편인증, 공동인증서 등으로 본인인증합니다.' },
  { title: '민원 서비스 이동', text: '민원 관련 메뉴에서 증명서 발급 영역을 찾습니다.' },
  { title: '자격확인서 선택', text: '증명서 목록에서 건강보험 자격확인서를 선택합니다.' },
  { title: '발급 내용 확인', text: '필요한 발급 항목 및 표시 내용을 확인합니다.' },
  { title: '출력하기', text: '프린터로 출력하여 다른 구비서류와 함께 보관합니다.' },
];

const mobileSteps = [
  { title: '앱 설치', text: '앱스토어 또는 Google Play에서 The건강보험 앱 설치' },
  { title: '로그인', text: '간편인증 또는 공동인증서 등으로 본인인증' },
  { title: '증명서 발급 메뉴 찾기', text: '앱 내 민원 또는 증명서 발급 관련 메뉴로 이동' },
  { title: '건강보험 자격확인서 선택', text: '서류명이 정확히 건강보험 자격확인서인지 확인' },
  { title: '발급 및 저장', text: '발급 후 PDF 등으로 저장' },
  { title: '서류 출력', text: '저장한 파일을 PC 또는 출력 가능한 장소에서 출력' },
];

const checklistItems = [
  '신청 자격 조건을 확인했어요.',
  '건강보험 자격확인서를 발급했어요.',
  '건강보험 자격확인서를 출력했어요.',
  '서류의 성명 등 본인 정보가 정확한지 확인했어요.',
  '공고문에서 요구한 서류 발급일 기준을 확인했어요.',
  '신청서 등 추가 구비서류를 준비했어요.',
  '본인 신분증을 준비했어요.',
  '주민등록상 거주지 관할 읍·면·동 행정복지센터를 확인했어요.',
  '방문 가능 시간과 접수 기간을 확인했어요.',
];

const processSteps = [
  { title: '참가 자격 확인', text: '연령, 주민등록상 경산시 거주 여부, BMI 기준 확인' },
  { title: '구비서류 준비', text: '건강보험 자격확인서와 공고문상 필요 서류 발급·출력' },
  { title: '행정복지센터 방문', text: '주민등록상 거주지 관할 읍·면·동 행정복지센터 방문' },
  { title: '신청서 작성 및 서류 제출', text: '담당자 안내에 따라 신청서를 작성하고 준비한 서류 제출' },
  { title: '접수 확인', text: '접수 여부와 이후 절차를 담당자에게 확인' },
];

const faqs = [
  ['온라인으로 신청할 수 있나요?', '아니요. 청년사회서비스는 온라인 신청이 불가하며, 구비서류를 지참하여 거주지 관할 읍·면·동 행정복지센터에 방문해야 합니다.'],
  ['온라인으로 서류 파일을 첨부할 수 있나요?', '아니요. 온라인 파일 첨부는 불가합니다. 방문 신청 시 제출할 수 있도록 필요한 서류를 출력해 준비해 주세요.'],
  ['건강보험 자격확인서는 온라인으로 발급할 수 있나요?', '네. 국민건강보험공단 홈페이지 또는 The건강보험 앱을 통해 발급할 수 있습니다. 다만 신청 시에는 출력본 지참 여부를 확인해야 합니다.'],
  ['PDF 파일만 휴대전화에 저장해 가도 되나요?', '기본적으로 종이 출력본을 준비하는 것을 권장합니다. 전자문서 인정 여부는 공고문 또는 방문 예정 행정복지센터에 확인해 주세요.'],
  ['어느 행정복지센터로 가야 하나요?', '주민등록상 주소지 관할 읍·면·동 행정복지센터로 방문해야 합니다.'],
  ['자격확인서와 자격득실확인서는 같은 서류인가요?', '서로 다른 서류일 수 있습니다. 반드시 공고문에 기재된 서류명과 동일한지 확인해 주세요.'],
  ['대리 신청이 가능한가요?', '대리 신청 가능 여부, 위임장 및 추가 구비서류 필요 여부는 사업 공고문 또는 행정복지센터에 사전 문의해 주세요.'],
  ['발급일이 오래된 서류도 제출할 수 있나요?', '인정 가능한 발급일 기준은 사업 공고문을 확인해야 합니다. 기준이 있는 경우 최근 발급본을 준비하는 것이 안전합니다.'],
];

const infoChips = [
  { icon: Clock, label: '발급 소요 시간', value: '약 3~5분' },
  { icon: CreditCard, label: '발급 수수료', value: '무료' },
  { icon: Monitor, label: '발급 방법', value: 'PC 또는 모바일' },
  { icon: Building2, label: '신청 방법', value: '행정복지센터 방문' },
  { icon: AlertTriangle, label: '온라인 접수', value: '불가' },
];

type Props = { onBack: () => void };

export default function IssuancePage({ onBack }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState<'pc' | 'mobile'>('pc');
  const [checked, setChecked] = useState<boolean[]>(() => checklistItems.map(() => false));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showExternal, setShowExternal] = useState(false);
  const [district, setDistrict] = useState('');
  const [centerFound, setCenterFound] = useState(false);
  const [notice, setNotice] = useState('');

  const scrollTo = (id: string) => {
    if (id === 'documents' || id === 'faq' || id === 'contact') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onBack();
    }
    setMobileOpen(false);
  };

  const checkedCount = checked.filter(Boolean).length;
  const allChecked = checkedCount === checklistItems.length;

  const toggle = (index: number) => setChecked((items) => items.map((value, i) => (i === index ? !value : value)));

  const handleSearch = () => {
    if (!district) {
      setNotice('읍·면·동을 선택해 주세요.');
      window.setTimeout(() => setNotice(''), 3000);
      return;
    }
    setCenterFound(true);
  };

  const showCenterNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  };

  return (
    <div className="min-h-screen bg-white text-[#17243A]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="site-shell flex h-[72px] items-center justify-between">
          <button onClick={onBack} className="back-button"><ArrowLeft size={17} /></button>
          <button onClick={onBack} className="flex items-center gap-3 text-left" aria-label="메인으로 이동"><span className="brand-mark"><HeartPulse size={21} strokeWidth={2.5} /></span><span className="hidden text-[13px] font-extrabold leading-tight text-[#0B2E5E] sm:block">경산 청년 건강관리<br />프로그램</span></button>
          <nav className="hidden items-center gap-7 lg:flex">{navItems.map(([label, id]) => <button key={`${label}-${id}`} onClick={() => scrollTo(id)} className={`nav-link ${id === 'documents' ? 'nav-active' : ''}`}>{label}</button>)}<button onClick={() => setShowExternal(true)} className="button button-primary !h-10 !px-4 text-[13px]">참가 자격 확인하기 <ArrowRight size={15} /></button></nav>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl text-[#0B2E5E] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="메뉴 열기">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden"><div className="site-shell flex flex-col gap-2">{navItems.map(([label, id]) => <button key={`${label}-${id}`} onClick={() => scrollTo(id)} className="rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50">{label}</button>)}<button onClick={() => setShowExternal(true)} className="button button-primary mt-2 w-full">참가 자격 확인하기 <ArrowRight size={17} /></button></div></div>}
      </header>

      <main>
        <section className="notice-banner px-5 py-7 sm:px-8"><div className="site-shell"><div className="notice-grid rounded-[22px] border border-amber-200/80 bg-[#FFF7E8] px-5 py-6 sm:px-8 sm:py-7"><div className="flex items-start gap-4"><span className="notice-icon-box"><AlertTriangle size={24} /></span><div><h2 className="text-lg font-extrabold text-amber-900 sm:text-xl">청년사회서비스는 방문 신청만 가능합니다</h2><p className="mt-2 text-sm leading-7 text-amber-800">건강보험 자격확인서를 포함한 구비서류를 준비하여, <b>주민등록상 거주지 관할 읍·면·동 행정복지센터에 직접 방문해 신청해 주세요.</b></p></div></div><div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-4">{[['신청 방법', '읍·면·동 행정복지센터 방문'], ['온라인 신청', '불가'], ['온라인 파일 첨부', '불가'], ['제출 방식', '구비서류 출력본 지참']].map(([label, value]) => <div className="notice-card" key={label}><span>{label}</span><b>{value}</b></div>)}</div><p className="mt-5 border-t border-amber-200/80 pt-4 text-[13px] leading-6 text-amber-800">건강보험 자격확인서는 온라인으로 발급할 수 있지만, 청년사회서비스 신청은 온라인으로 제출할 수 없습니다.</p></div></div></section>

        <section className="section-padding bg-gradient-to-b from-white to-[#F4F9FE]"><div className="site-shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"><div className="relative z-10"><div className="eyebrow"><span className="eyebrow-dot" /> 건강보험 자격확인서 발급 안내</div><h1 className="mt-6 max-w-[560px] text-[34px] font-extrabold leading-[1.22] tracking-tight text-[#0B2E5E] sm:text-[44px]"><span className="text-[#1261D6]">건강보험 자격확인서</span>를 발급하고,<br />가까운 읍·면·동 <span className="text-[#1261D6]">행정복지센터</span>에 방문해 신청하세요</h1><p className="mt-5 max-w-[500px] text-[15px] leading-7 text-slate-600">국민건강보험공단 홈페이지 또는 The건강보험 앱에서 건강보험 자격확인서를 발급한 뒤, 출력하여 방문 신청 시 제출해 주세요.</p><div className="mt-7 grid max-w-[520px] grid-cols-2 gap-2.5 sm:grid-cols-3">{infoChips.map(({ icon: Icon, label, value }) => <div className="info-chip" key={label}><Icon size={15} className="text-[#1261D6]" /><span>{label}</span><b>{value}</b></div>)}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => setShowExternal(true)} className="button button-primary">건강보험 자격확인서 발급 바로가기 <ExternalLink size={16} /></button><button onClick={() => scrollTo('documents')} className="button button-secondary">방문 신청 절차 확인하기</button></div></div><HeroIllustration /></div></section>

        <section className="section-padding bg-white"><div className="site-shell"><SectionHeading eyebrow="사전 준비" title="발급 전, 준비할 사항을 확인해 주세요" text="발급 전에 본인인증 수단과 출력 환경을 먼저 확인하면 서류 준비가 훨씬 편리합니다." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{preparationCards.map(({ icon: Icon, title, text }) => <div className="info-card" key={title}><span className="icon-box"><Icon size={21} /></span><h3 className="mt-6 text-[17px] font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2.5 text-[13px] leading-6 text-slate-500">{text}</p></div>)}</div><div className="mt-7 rounded-2xl border border-blue-100 bg-[#F4F9FE] px-6 py-5 sm:px-8"><div className="flex items-start gap-3"><Info size={19} className="mt-0.5 shrink-0 text-[#1261D6]" /><div><h3 className="text-base font-extrabold text-[#0B2E5E]">제출용 서류는 출력본을 준비해 주세요</h3><p className="mt-2 text-sm leading-7 text-slate-600">청년사회서비스는 온라인 파일 업로드 또는 온라인 접수가 불가합니다. 건강보험 자격확인서는 발급 후 종이로 출력하여 방문 신청 시 제출하는 것을 기본으로 안내합니다.</p><p className="mt-2 text-[13px] leading-6 text-slate-500">모바일 화면 또는 PDF 파일만으로 제출 가능한지는 반드시 해당 읍·면·동 행정복지센터 또는 사업 공고문을 통해 확인해 주세요.</p></div></div></div></div></section>

        <section id="documents" className="section-padding bg-[#F7FBFF]"><div className="site-shell"><SectionHeading eyebrow="발급 방법" title="편한 방법으로 자격확인서를 발급하세요" text="PC 또는 휴대전화에서 발급할 수 있습니다. 발급 후에는 반드시 서류를 출력하여 방문 신청 시 지참해 주세요." /><div className="mt-10 flex rounded-2xl bg-slate-100/70 p-1.5"><button onClick={() => setTab('pc')} className={`tab-button ${tab === 'pc' ? 'tab-active' : ''}`}><Monitor size={17} /> PC 홈페이지에서 발급</button><button onClick={() => setTab('mobile')} className={`tab-button ${tab === 'mobile' ? 'tab-active' : ''}`}><Smartphone size={17} /> 휴대전화 앱에서 발급</button></div><div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]"><div>{tab === 'pc' ? <GuideSteps title="PC에서 발급하고 바로 출력하기" subtitle="프린터가 있다면 가장 편리하게 준비할 수 있어요." steps={pcSteps} /> : <GuideSteps title="휴대전화에서 발급하기" subtitle="The건강보험 앱으로 발급한 후 출력 방법까지 확인해 주세요." steps={mobileSteps} />}{tab === 'mobile' && <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-[#FFF7E8] px-5 py-4 text-sm leading-7 text-amber-800"><AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-500" /><span><b>휴대전화 화면이나 캡처 이미지만으로 제출하지 마세요.</b><br />방문 전 출력본 필요 여부를 반드시 확인하고, 기본적으로는 종이 서류를 준비해 주세요.</span></div>}</div><div className="space-y-4"><div className="tip-card"><div className="flex items-center gap-3"><span className="tip-icon"><Printer size={18} /></span><b>프린터가 없는 경우</b></div><p className="mt-3 text-[13px] leading-6 text-slate-500">PDF 파일로 저장한 뒤 가까운 출력 가능한 장소에서 출력할 수 있습니다.</p><div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-[13px] font-bold text-[#1261D6]">방문 신청 시에는 출력한 서류를 지참하는 것을 기본으로 안내합니다.</div></div><button onClick={() => setShowExternal(true)} className="button button-primary w-full !h-14 text-[15px]">건강보험 자격확인서 발급 바로가기 <ExternalLink size={17} /></button></div></div></div></section>

        <section className="section-padding bg-white"><div className="site-shell"><SectionHeading eyebrow="서류명 확인" title="비슷한 이름의 서류와 혼동하지 마세요" text="발급 화면에서 서류명을 정확히 확인해 주세요." /><div className="mt-12 grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]"><div className="compare-card compare-correct"><div className="compare-badge bg-[#EAF8F1] text-[#20A56A]">제출 대상</div><h3 className="mt-5 text-xl font-extrabold text-[#0B2E5E]">건강보험 자격확인서</h3><ul className="mt-4 space-y-2.5 text-[13px] leading-6 text-slate-600">{['현재 건강보험 자격 관련 정보', '공고문에서 요구한 경우 제출', '발급 전 서류명 확인'].map((item) => <li className="flex items-start gap-2" key={item}><Check size={15} className="mt-1 shrink-0 text-[#20A56A]" />{item}</li>)}</ul></div><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-400">VS</div><div className="compare-card compare-warn"><div className="compare-badge bg-amber-50 text-amber-600">확인 필요</div><h3 className="mt-5 text-xl font-extrabold text-[#0B2E5E]">건강보험 자격득실확인서</h3><ul className="mt-4 space-y-2.5 text-[13px] leading-6 text-slate-600">{['건강보험 자격 취득·상실 이력', '별도 요구된 경우 제출', '자격확인서와 다른 서류일 수 있음'].map((item) => <li className="flex items-start gap-2" key={item}><AlertTriangle size={15} className="mt-1 shrink-0 text-amber-500" />{item}</li>)}</ul></div></div><div className="mt-7 rounded-2xl border border-amber-200/80 bg-[#FFF7E8] px-6 py-5"><p className="text-sm font-bold leading-7 text-amber-900">건강보험 자격확인서와 건강보험 자격득실확인서는 다를 수 있으므로, 발급 화면에서 서류명을 꼭 확인해 주세요.</p><p className="mt-2 text-[13px] leading-6 text-amber-700">사업 신청에 필요한 서류는 공고문에 기재된 명칭을 우선합니다.</p></div></div></section>

        <section className="section-padding bg-[#F7FBFF]"><div className="site-shell max-w-3xl"><SectionHeading eyebrow="방문 준비" title="행정복지센터 방문 전, 서류를 다시 확인하세요" text="체크리스트를 하나씩 확인하면 방문 신청이 더욱 원활합니다." /><div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><div className="flex items-center justify-between"><div><span className="text-sm font-bold text-slate-500">준비 완료</span><b className="ml-2 text-2xl font-extrabold text-[#1261D6]">{checkedCount} <span className="text-base text-slate-400">/ {checklistItems.length}</span></b></div><span className={`check-progress ${allChecked ? 'check-progress-done' : ''}`}>{allChecked ? <><CheckCircle2 size={15} /> 방문 준비 완료!</> : '진행 중'}</span></div><div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#20A56A] transition-all duration-300" style={{ width: `${(checkedCount / checklistItems.length) * 100}%` }} /></div><div className="mt-6 divide-y divide-slate-100">{checklistItems.map((item, index) => <button key={item} onClick={() => toggle(index)} className="check-row" aria-pressed={checked[index]}><span className={`check-box ${checked[index] ? 'check-box-on' : ''}`}>{checked[index] && <Check size={14} />}</span><span className={checked[index] ? 'text-slate-400 line-through' : 'text-slate-700'}>{item}</span></button>)}</div></div><div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200/70 bg-[#EAF8F1] px-5 py-4 text-sm leading-6 text-[#188b58]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#20A56A]" /><span>구비서류는 투명 파일 또는 서류봉투에 넣어 준비하면 접수 시 편리합니다.</span></div></div></section>

        <section className="section-padding bg-white"><div className="site-shell"><SectionHeading eyebrow="신청 절차" title="청년사회서비스 신청은 이렇게 진행됩니다" text="자격 확인부터 접수 확인까지, 다섯 단계로 진행됩니다." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{processSteps.map(({ title, text }, index) => <div className="process-card" key={title}><div className="flex items-center justify-between"><span className="process-num">{String(index + 1).padStart(2, '0')}</span>{index < 4 && <ArrowRight className="hidden text-blue-200 xl:block" size={18} />}</div><h3 className="mt-5 text-[15px] font-extrabold leading-snug text-[#0B2E5E]">{title}</h3><p className="mt-2 text-[13px] leading-6 text-slate-500">{text}</p></div>)}</div><div className="mt-7 rounded-2xl border border-amber-200/80 bg-[#FFF7E8] px-6 py-5"><p className="text-sm font-bold leading-7 text-amber-900">온라인에서는 신청서 작성, 파일 첨부, 신청 접수가 불가합니다.</p><p className="mt-1 text-[13px] leading-6 text-amber-700">반드시 본인이 구비서류를 지참하여 행정복지센터를 방문해야 합니다.</p></div></div></section>

        <section id="contact" className="section-padding bg-[#F7FBFF]"><div className="site-shell"><SectionHeading eyebrow="방문 장소" title="어디로 방문해야 하나요?" text="신청자의 주민등록상 주소지 관할 읍·면·동 행정복지센터에 방문해 주세요." /><div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><select className="search-select" defaultValue="경산시" aria-label="시/군"><option>경산시</option></select><select className="search-select" value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="읍/면/동"><option value="">읍·면·동 선택</option><option>중방동</option><option>정화동</option><option>남방동</option><option>백천동</option><option>임당동</option></select><button onClick={handleSearch} className="button button-primary !h-12"><Search size={16} /> 검색</button></div>{centerFound && district && <div className="mt-6 rounded-2xl border border-blue-100 bg-[#F4F9FE] p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex items-center gap-2"><Building2 size={18} className="text-[#1261D6]" /><h3 className="text-lg font-extrabold text-[#0B2E5E]">{district} 행정복지센터</h3></div><p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><MapPin size={15} className="text-slate-400" /> 경상북도 경산시 ○○로 00</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Clock size={15} className="text-slate-400" /> 평일 09:00 ~ 18:00</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Phone size={15} className="text-slate-400" /> 053-000-0000</p></div><div className="flex flex-col gap-2.5 sm:flex-row"><button onClick={() => showCenterNotice('지도는 실제 경산시 공식 안내를 기준으로 연결될 예정입니다.')} className="button button-secondary !h-11 !text-sm">지도 보기 <ExternalLink size={14} /></button><button onClick={() => showCenterNotice('전화 연결은 실제 운영 시 담당 부서 번호로 연결됩니다.')} className="button button-primary !h-11 !text-sm"><Phone size={14} /> 전화 문의</button></div></div></div>}<p className="mt-5 flex items-center gap-2 text-[13px] text-slate-500"><Info size={15} className="text-[#1261D6]" /> 점심시간·접수 마감시간은 방문 전 확인을 권장합니다.</p><p className="mt-2 text-[11px] leading-5 text-slate-400">실제 운영 시 행정복지센터 정보는 최신 주소·전화번호 데이터와 경산시 공식 안내 페이지를 기준으로 관리해야 합니다.</p></div></div></section>

        <section id="faq" className="section-padding bg-white"><div className="site-shell max-w-4xl"><SectionHeading eyebrow="도움말" title="자주 묻는 질문" text="발급 및 방문 신청 전 가장 많이 궁금해하는 내용을 확인해 보세요." /><div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 sm:px-8">{faqs.map(([question, answer], index) => <div key={question}><button className="faq-button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={19} className={`shrink-0 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-all duration-300 ${openFaq === index ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-sm leading-7 text-slate-500">{answer}</p></div></div>)}</div></div></section>

        <section className="px-5 pb-24 pt-4 sm:px-8"><div className="site-shell"><div className="final-cta relative overflow-hidden rounded-[28px] bg-[#0B3C78] px-7 py-14 sm:px-14 sm:py-16"><div className="leaf leaf-one" /><div className="leaf leaf-two" /><div className="relative z-10 max-w-2xl"><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">서류 발급에서 방문 신청까지</span><h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-[40px]">자격확인서를 발급한 뒤,<br />출력하여 방문 신청해 주세요</h2><p className="mt-5 text-sm leading-7 text-blue-100">국민건강보험공단 공식 홈페이지에서 건강보험 자격확인서를 발급할 수 있습니다. 발급 후에는 서류를 출력하고, 다른 구비서류 및 신분증과 함께 거주지 관할 읍·면·동 행정복지센터에 방문해 주세요.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><button onClick={() => setShowExternal(true)} className="button bg-white text-[#0B2E5E] hover:bg-blue-50">건강보험 자격확인서 발급 바로가기 <ExternalLink size={16} /></button><button onClick={() => scrollTo('documents')} className="button border border-white/40 bg-white/10 text-white hover:bg-white/20">방문 신청 준비물 확인하기</button><button onClick={() => scrollTo('contact')} className="button border border-white/40 bg-transparent text-white hover:bg-white/10">관할 행정복지센터 찾기</button><button onClick={onBack} className="button border border-white/30 bg-transparent text-blue-100 hover:bg-white/10"><ArrowLeft size={16} /> 신청 자격 확인으로 돌아가기</button></div></div></div></div></section>
      </main>

      <footer className="bg-[#092B55] text-blue-100"><div className="site-shell grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]"><div><div className="flex items-center gap-3"><span className="brand-mark brand-mark-dark"><HeartPulse size={20} /></span><b className="text-sm text-white">경산 청년 건강관리<br />프로그램</b></div><p className="mt-5 text-sm text-blue-200">청년의 건강한 삶을 응원합니다.</p></div><FooterGroup title="이용 안내" items={['참가자격', '자격 미리 확인', '제출서류', '자주 묻는 질문', '문의하기']} /><FooterGroup title="개인정보" items={['개인정보 처리방침', '이용약관', '이메일 무단수집 거부']} /><div><h3 className="text-sm font-extrabold text-white">문의</h3><p className="mt-5 text-sm leading-7 text-blue-200">경산시 ○○사업 운영팀<br />053-810-XXXX<br />평일 09:00 ~ 18:00<br />healthy@gs.go.kr</p></div></div><div className="border-t border-white/10"><div className="site-shell flex flex-col gap-2 py-5 text-xs text-blue-300 sm:flex-row sm:justify-between"><span>© 2026 경산 청년 건강관리 프로그램. All rights reserved.</span><span>본 서비스는 사전 자격 확인 및 서류 발급 안내를 위한 페이지입니다.</span></div></div></footer>

      <div className="sticky-cta-bar lg:hidden"><div className="site-shell flex flex-col items-center gap-2"><p className="text-[11px] font-bold text-slate-500">발급 후 출력하여 행정복지센터에 방문 신청해 주세요.</p><button onClick={() => setShowExternal(true)} className="button button-primary w-full !h-12">건강보험 자격확인서 발급 바로가기 <ExternalLink size={16} /></button></div></div>

      {notice && <div className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0B2E5E] px-5 py-3 text-sm font-bold text-white shadow-xl"><CheckCircle2 size={17} className="text-[#8BE0B7]" /> {notice}</div>}
      {showExternal && <ExternalModal onClose={() => setShowExternal(false)} />}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="max-w-2xl"><span className="section-eyebrow">{eyebrow}</span><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2E5E] sm:text-[36px]">{title}</h2><p className="mt-4 text-[15px] leading-7 text-slate-500">{text}</p></div>;
}

function FooterGroup({ title, items }: { title: string; items: string[] }) { return <div><h3 className="text-sm font-extrabold text-white">{title}</h3><div className="mt-5 space-y-3 text-sm text-blue-200">{items.map((item) => <p key={item}>{item}</p>)}</div></div>; }

function GuideSteps({ title, subtitle, steps }: { title: string; subtitle: string; steps: { title: string; text: string }[] }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><h3 className="text-xl font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p><div className="mt-6 space-y-4">{steps.map(({ title: stepTitle, text }, index) => <div className="flex gap-4" key={stepTitle}><span className="guide-num">{String(index + 1).padStart(2, '0')}</span><div><h4 className="font-bold text-[#0B2E5E]">{stepTitle}</h4><p className="mt-1 text-[13px] leading-6 text-slate-500">{text}</p></div></div>)}</div></div>;
}

function HeroIllustration() {
  return <div className="hero-visual-2 relative mx-auto h-[420px] w-full max-w-[520px]"><div className="orbit-bg" /><div className="monitor"><div className="monitor-screen"><div className="doc-header"><HeartPulse size={13} className="text-white" /><span>건강보험 자격확인서</span></div><div className="doc-line doc-line-wide" /><div className="doc-line" /><div className="doc-line" /><div className="doc-grid"><div /><div /><div /></div><div className="doc-stamp"><Check size={22} /></div></div><div className="monitor-stand" /><div className="monitor-base" /></div><div className="phone"><div className="phone-notch" /><div className="phone-screen"><div className="app-bar"><ShieldCheck size={11} className="text-white" /><span>The건강보험</span></div><div className="app-card"><span className="app-line app-line-wide" /><span className="app-line" /><span className="app-line" /></div><div className="app-btn">자격확인서 발급</div></div></div><div className="paper-stack"><div className="paper paper-1" /><div className="paper paper-2"><div className="paper-line" /><div className="paper-line paper-line-short" /><div className="paper-line" /></div></div><div className="check-badge"><CheckCircle2 size={28} /></div><div className="leaf-deco leaf-deco-1" /><div className="leaf-deco leaf-deco-2" /></div>;
}

function ExternalModal({ onClose }: { onClose: () => void }) {
  const openSite = () => { window.open('https://www.nhis.or.kr', '_blank', 'noopener,noreferrer'); onClose(); };
  return <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}><div className="external-modal" onClick={(e) => e.stopPropagation()}><div className="flex items-center gap-3"><span className="modal-icon-box"><Globe size={22} /></span><h3 className="text-lg font-extrabold text-[#0B2E5E]">국민건강보험공단으로 이동할까요?</h3></div><p className="mt-4 text-sm leading-7 text-slate-600">국민건강보험공단 공식 홈페이지에서 건강보험 자격확인서를 발급할 수 있습니다. 발급 후에는 서류를 출력하여 거주지 관할 읍·면·동 행정복지센터에 방문해 신청해 주세요.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"><button onClick={onClose} className="button button-secondary">취소</button><button onClick={openSite} className="button button-primary">국민건강보험공단으로 이동 <ExternalLink size={16} /></button></div></div></div>;
}
