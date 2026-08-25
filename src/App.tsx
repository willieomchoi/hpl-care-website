import { useEffect, useMemo, useState } from 'react';
import IssuancePage from '@/IssuancePage';
import {
  AlertCircle,
  ArrowRight,
  Cake,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HeartPulse,
  Info,
  LockKeyhole,
  MapPin,
  Menu,
  Monitor,
  MoveRight,
  PlayCircle,
  Scale,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';

type CheckerStep = 1 | 2 | 3 | 4;
type DocumentChoice = 'ready' | 'can-get' | 'need-help' | '';

const navItems = [
  ['참가자격', 'eligibility'],
  ['자격 미리 확인', 'checker'],
  ['제출서류', 'documents'],
  ['자주 묻는 질문', 'faq'],
  ['문의하기', 'contact'],
];

const eligibilityItems = [
  { icon: Cake, number: '01', title: '연령', value: '만 19세 ~ 34세', text: '신청일 또는 공고문 기준일을 기준으로 확인합니다.' },
  { icon: MapPin, number: '02', title: '거주지', value: '주민등록상 경산시 거주자', text: '실제 생활지가 아닌 주민등록상 주소를 기준으로 합니다.' },
  { icon: Scale, number: '03', title: 'BMI', value: '23 이상 또는 18.5 미만', text: '신장과 체중을 바탕으로 자동 계산합니다.' },
  { icon: FileCheck2, number: '04', title: '증빙서류', value: '건강보험 자격확인서', text: '신청 시 제출 가능한 서류를 미리 준비합니다.' },
];

const faqs = [
  ['만 나이는 어떻게 계산하나요?', '신청 공고에 명시된 기준일을 기준으로 계산합니다. 자격 확인에서 생년월일을 입력하면 현재 기준으로 자동 확인할 수 있습니다.'],
  ['현재 경산시에 살고 있지만 주민등록 주소는 다른 지역입니다. 신청할 수 있나요?', '거주지 조건은 주민등록상 주소지를 기준으로 합니다. 주민등록상 주소가 경산시인지 확인해 주세요.'],
  ['BMI는 어떻게 계산하나요?', '체중(kg)을 신장(m)의 제곱으로 나눈 값입니다. 자격 확인에서 신장과 체중을 입력하면 자동 계산됩니다.'],
  ['BMI가 18.5 이상 23 미만입니다. 신청할 수 있나요?', '본 프로그램의 BMI 기준은 23 이상 또는 18.5 미만입니다. 해당 구간은 기준에 포함되지 않습니다.'],
  ['건강보험 자격확인서는 꼭 제출해야 하나요?', '신청 시 필요한 증빙서류이므로 공고문에 안내된 기준에 맞추어 제출해야 합니다.'],
  ['자격 확인 결과가 가능이면 무조건 선정되나요?', '아닙니다. 자가진단은 사전 확인용이며 최종 자격 및 선정 여부는 제출 서류 검토 후 결정됩니다.'],
  ['신장·체중 정보가 저장되나요?', '자가진단용으로만 이용하고 별도 저장하지 않는 방식으로 운영하는 것을 전제로 합니다. 실제 운영 정책은 개인정보 처리방침에 명확히 안내합니다.'],
];

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [step, setStep] = useState<CheckerStep>(1);
  const [birth, setBirth] = useState('1998-03-15');
  const [location, setLocation] = useState('경산시');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('67.7');
  const [documentChoice, setDocumentChoice] = useState<DocumentChoice>('can-get');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  const bmi = useMemo(() => {
    const heightNumber = Number(height);
    const weightNumber = Number(weight);
    if (!heightNumber || !weightNumber) return 0;
    return weightNumber / ((heightNumber / 100) ** 2);
  }, [height, weight]);

  const age = useMemo(() => {
    if (!birth) return 0;
    const birthday = new Date(`${birth}T00:00:00`);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth() - birthday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) calculatedAge -= 1;
    return calculatedAge;
  }, [birth]);

  if (path === '/issuance') return <IssuancePage onBack={() => navigate('/')} />;

  const ageEligible = age >= 19 && age <= 34;
  const locationEligible = location === '경산시';
  const bmiEligible = bmi >= 23 || (bmi > 0 && bmi < 18.5);
  const canContinue = step === 1 ? Boolean(birth && location) : step === 2 ? bmi > 0 : Boolean(documentChoice);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const openChecker = () => {
    setNotice('');
    setCheckerOpen(true);
    setStep(1);
  };

  const nextStep = () => {
    if (!canContinue) return;
    setStep((current) => (current < 4 ? (current + 1) as CheckerStep : current));
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-[#16233B]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="site-shell flex h-[72px] items-center justify-between">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-3 text-left" aria-label="처음으로 이동">
            <span className="brand-mark"><HeartPulse size={21} strokeWidth={2.5} /></span>
            <span className="hidden text-[13px] font-extrabold leading-tight text-[#0B2E5E] sm:block">경산 청년 건강관리<br />프로그램</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>)}
            <button onClick={openChecker} className="button button-primary !h-10 !px-4 text-[13px]">참가 자격 확인하기 <ArrowRight size={15} /></button>
          </nav>
          <button className="flex h-11 w-11 items-center justify-center rounded-xl text-[#0B2E5E] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="메뉴 열기">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden"><div className="site-shell flex flex-col gap-2">{navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50">{label}</button>)}<button onClick={openChecker} className="button button-primary mt-2 w-full">참가 자격 확인하기 <ArrowRight size={17} /></button></div></div>}
      </header>

      <main>
        <section id="top" className="hero-section overflow-hidden">
          <div className="site-shell grid min-h-[670px] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div className="relative z-10">
              <div className="eyebrow"><span className="eyebrow-dot" /> 경산 청년 건강관리 프로그램</div>
              <h1 className="mt-7 max-w-[620px] text-[42px] font-extrabold leading-[1.18] tracking-[-0.055em] text-[#0B2E5E] sm:text-[54px]">내가 참가할 수 있을까?<br /><span className="text-[#1261D6]">1분이면 참가 자격을</span><br />미리 확인할 수 있어요!</h1>
              <p className="mt-6 max-w-[500px] text-[16px] leading-8 text-slate-600">나이, 경산시 거주 여부, BMI 기준을 간단히 확인하고<br className="hidden sm:block" /> 신청에 필요한 건강보험 자격확인서도 미리 준비하세요.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={openChecker} className="button button-primary">내 참가 자격 확인하기 <ArrowRight size={18} /></button><button onClick={() => scrollTo('eligibility')} className="button button-secondary">자격요건 먼저 보기</button></div>
              <div className="mt-8 flex max-w-[500px] items-start gap-3 rounded-2xl border border-blue-100 bg-white/75 p-4 text-[12px] leading-5 text-slate-500 shadow-sm"><Info size={16} className="mt-0.5 shrink-0 text-[#1261D6]" /><span>본 결과는 신청 전 참고를 위한 자가진단 결과입니다.<br />최종 참가 자격은 제출 서류 확인 및 운영기관 심사를 통해 결정됩니다.</span></div>
            </div>
            <HeroIllustration />
          </div>
        </section>

        <section id="eligibility" className="section-padding bg-white">
          <div className="site-shell"><SectionHeading eyebrow="참가 기준" title="참가 자격을 확인해 주세요" text="아래 네 가지 기준을 먼저 확인하면 신청 가능 여부를 빠르게 파악할 수 있어요." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{eligibilityItems.map(({ icon: Icon, number, title, value, text }) => <div key={title} className="info-card"><div className="flex items-center justify-between"><span className="icon-box"><Icon size={21} /></span><span className="text-xs font-extrabold text-blue-200">{number}</span></div><h3 className="mt-7 text-lg font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2 font-bold text-slate-700">{value}</p><p className="mt-3 text-[13px] leading-6 text-slate-500">{text}</p></div>)}</div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-100 bg-[#FFF9ED] px-5 py-4 text-sm leading-6 text-amber-800"><AlertCircle size={19} className="mt-0.5 shrink-0 text-amber-500" /><span><b>BMI 기준을 확인해 주세요.</b> BMI가 18.5 이상 23 미만인 경우에는 본 프로그램의 BMI 조건에 해당하지 않습니다.</span></div>
          </div>
        </section>

        <section id="checker" className="section-padding bg-[#F7FBFF]">
          <div className="site-shell"><div className="checker-promo grid items-center gap-12 overflow-hidden px-7 py-9 sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-14"><div><div className="eyebrow">간편 사전 자격 확인</div><h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0B2E5E] sm:text-[40px]">내 참가 자격<br /><span className="text-[#1261D6]">미리 확인하기</span></h2><p className="mt-5 max-w-[400px] text-sm leading-7 text-slate-600">간단한 정보 입력만으로 현재 기준의 참가 가능 여부를 미리 확인할 수 있습니다.</p><button onClick={openChecker} className="button button-success mt-7">자격 확인 시작하기 <ArrowRight size={17} /></button></div><div className="grid gap-3 sm:grid-cols-2">{[['01', '기본정보 입력', '생년월일 · 거주지', Cake], ['02', '신체정보 입력', '신장 · 체중 · BMI', Scale], ['03', '서류 준비 확인', '건강보험 자격확인서', FileText], ['04', '결과 확인', '참가 자격 충족 여부', ClipboardCheck]].map(([num, title, desc, Icon]) => { const StepIcon = Icon as typeof Cake; return <div className="step-card" key={num}><div className="flex items-center justify-between"><span className="step-number">STEP {num}</span><StepIcon size={18} className="text-[#1261D6]" /></div><p className="mt-4 font-extrabold text-[#0B2E5E]">{title}</p><p className="mt-1 text-xs text-slate-500">{desc}</p></div>})}</div></div><div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500"><LockKeyhole size={15} className="text-[#20A56A]" /> 입력 정보는 자격 확인 결과 제공을 위해서만 사용되며, 별도 저장하지 않습니다.</div></div>
        </section>

        <section id="documents" className="section-padding bg-white"><div className="site-shell"><SectionHeading eyebrow="제출서류 안내" title="건강보험 자격확인서, 미리 준비하세요" text="신청 시 건강보험 자격확인서 제출이 필요합니다. 온라인 또는 모바일로 간편하게 발급할 수 있습니다." /><div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[Monitor, '온라인', '국민건강보험공단 홈페이지', 'PC에서 출력 또는 PDF 저장'], [Smartphone, '모바일', 'The건강보험 앱', '스마트폰에서 간편 발급'], [MapPin, '방문', '국민건강보험공단 지사', '신분증 지참 후 방문'], [FileText, '무인민원발급기', '가까운 무인민원발급기', '이용 가능한 장소 확인 필요']].map(([Icon, tag, title, desc]) => { const CardIcon = Icon as typeof Monitor; return <div className="doc-card" key={tag}><div className="icon-box"><CardIcon size={21} /></div><span className="mt-5 block text-xs font-bold text-[#20A56A]">{tag}</span><h3 className="mt-2 font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p></div>})}</div><div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#F7FBFF] px-6 py-5 sm:flex-row"><p className="flex items-center gap-2 text-sm font-bold text-slate-700"><ShieldCheck size={18} className="text-[#20A56A]" /> 발급 전, 제출 가능한 서류 기준을 확인해 주세요.</p><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><button onClick={() => navigate('/issuance')} className="button button-secondary !h-11 !text-sm">발급 방법 자세히 보기 <ArrowRight size={15} /></button><button onClick={() => showNotice('제출 서류 안내를 확인했습니다.')} className="button button-primary !h-11 !text-sm">제출 서류 전체 확인하기</button></div></div></div></section>

        <section className="section-padding bg-[#F7FBFF]"><div className="site-shell"><SectionHeading eyebrow="신청 안내" title="신청은 이렇게 진행돼요" text="자격 확인부터 운영기관 검토까지, 네 단계로 차근차근 진행됩니다." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{[['01', '참가 자격 미리 확인', '나이 · 거주지 · BMI 기준 확인'], ['02', '제출 서류 준비', '건강보험 자격확인서 발급 및 준비'], ['03', '온라인 신청서 작성', '개인정보 및 신청 정보 입력'], ['04', '운영기관 검토', '서류 확인 후 최종 결과 안내']].map(([num, title, desc], index) => <div key={num} className="relative"><div className="process-card"><span className="process-num">{num}</span><h3 className="mt-6 font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p></div>{index < 3 && <MoveRight className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-blue-200 xl:block" size={22} />}</div>)}</div><div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-4 text-sm leading-6 text-slate-600"><Info size={18} className="mt-0.5 shrink-0 text-[#1261D6]" /> 신청 완료 후에는 운영기관의 서류 검토가 진행됩니다. 추가 자료가 필요한 경우 등록한 연락처로 안내드립니다.</div></div></section>

        <section id="faq" className="section-padding bg-white"><div className="site-shell max-w-4xl"><SectionHeading eyebrow="도움말" title="자주 묻는 질문" text="신청 전에 가장 많이 궁금해하는 내용을 확인해 보세요." /> <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 sm:px-8">{faqs.map(([question, answer], index) => <div key={question}><button className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold text-[#0B2E5E]" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={19} className={`shrink-0 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button><div className={`grid transition-all duration-300 ${openFaq === index ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-sm leading-7 text-slate-500">{answer}</p></div></div>)}</div></div></section>

        <section id="contact" className="px-5 pb-20 pt-4 sm:px-8"><div className="site-shell"><div className="final-cta relative overflow-hidden rounded-[28px] px-7 py-12 sm:px-14 sm:py-16"><div className="leaf leaf-one" /><div className="leaf leaf-two" /><div className="relative z-10 max-w-2xl"><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">건강한 변화를 위한 첫걸음</span><h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-[42px]">준비가 되셨나요?<br />지금 참가 자격을 확인하고<br /><span className="text-[#8BE0B7]">신청을 시작하세요.</span></h2><p className="mt-5 text-sm leading-7 text-blue-100">경산 청년 건강관리 프로그램이 건강한 시작을 함께하겠습니다.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={openChecker} className="button bg-white text-[#0B2E5E] hover:bg-blue-50">내 참가 자격 확인하기 <ArrowRight size={17} /></button><button onClick={() => showNotice('온라인 신청은 운영기관 검토 후 안내될 예정입니다.')} className="button border border-white/40 bg-white/10 text-white hover:bg-white/20">온라인 신청하기</button><button onClick={() => showNotice('문의: 053-810-XXXX')} className="button border border-white/40 bg-transparent text-white hover:bg-white/10">문의하기</button></div></div></div></div></section>
      </main>

      <footer className="bg-[#071F40] text-blue-100"><div className="site-shell grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]"><div><div className="flex items-center gap-3"><span className="brand-mark brand-mark-dark"><HeartPulse size={20} /></span><b className="text-sm text-white">경산 청년 건강관리<br />프로그램</b></div><p className="mt-5 text-sm text-blue-200">청년의 건강한 삶을 응원합니다.</p></div><FooterGroup title="이용 안내" items={navItems.slice(0, 4).map(([label]) => label)} /><FooterGroup title="개인정보" items={['개인정보 처리방침', '이용약관', '이메일 무단수집 거부']} /><div><h3 className="text-sm font-extrabold text-white">문의</h3><p className="mt-5 text-sm leading-7 text-blue-200">경산시 ○○사업 운영팀<br />053-810-XXXX<br />평일 09:00 ~ 18:00<br />healthy@gs.go.kr</p></div></div><div className="border-t border-white/10"><div className="site-shell flex flex-col gap-2 py-5 text-xs text-blue-300 sm:flex-row sm:justify-between"><span>© 2026 경산 청년 건강관리 프로그램. All rights reserved.</span><span>본 서비스는 사전 자격 확인을 위한 안내 서비스입니다.</span></div></div></footer>

      {notice && <div className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0B2E5E] px-5 py-3 text-sm font-bold text-white shadow-xl"><CheckCircle2 size={17} className="text-[#8BE0B7]" /> {notice}</div>}
      {checkerOpen && <CheckerModal step={step} setStep={setStep} birth={birth} setBirth={setBirth} location={location} setLocation={setLocation} height={height} setHeight={setHeight} weight={weight} setWeight={setWeight} bmi={bmi} ageEligible={ageEligible} locationEligible={locationEligible} bmiEligible={bmiEligible} documentChoice={documentChoice} setDocumentChoice={setDocumentChoice} canContinue={canContinue} nextStep={nextStep} onClose={() => setCheckerOpen(false)} onNotice={showNotice} onNavigate={navigate} />}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="max-w-2xl"><span className="section-eyebrow">{eyebrow}</span><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B2E5E] sm:text-[38px]">{title}</h2><p className="mt-4 text-[15px] leading-7 text-slate-500">{text}</p></div>;
}

function FooterGroup({ title, items }: { title: string; items: string[] }) { return <div><h3 className="text-sm font-extrabold text-white">{title}</h3><div className="mt-5 space-y-3 text-sm text-blue-200">{items.map((item) => <p key={item}>{item}</p>)}</div></div>; }

function HeroIllustration() {
  return <div className="hero-visual relative mx-auto h-[470px] w-full max-w-[590px]"><div className="sun-disc" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="person person-man"><div className="hair hair-dark" /><div className="face" /><div className="neck" /><div className="shirt shirt-blue" /><div className="arm arm-left" /><div className="arm arm-right" /><div className="hand hand-left" /><div className="hand hand-right" /></div><div className="person person-woman"><div className="hair hair-brown" /><div className="face face-woman" /><div className="neck" /><div className="shirt shirt-green" /><div className="arm woman-arm-left" /><div className="arm woman-arm-right" /><div className="clipboard"><span /><span /><span /></div></div><div className="float-card bmi-float"><div className="float-label">BMI 체크</div><b>23.4</b><span className="float-success"><Check size={12} /> 기준 충족</span></div><div className="float-card checklist-float"><b>참가 자격 체크리스트</b><span><CheckCircle2 size={13} /> 만 19~34세</span><span><CheckCircle2 size={13} /> 경산시 거주</span><span><CheckCircle2 size={13} /> BMI 기준 충족</span><span className="muted"><div className="empty-dot" /> 건강보험 서류 준비</span></div><div className="plant plant-left" /><div className="plant plant-right" /></div>;
}

type CheckerProps = { step: CheckerStep; setStep: (step: CheckerStep) => void; birth: string; setBirth: (v: string) => void; location: string; setLocation: (v: string) => void; height: string; setHeight: (v: string) => void; weight: string; setWeight: (v: string) => void; bmi: number; ageEligible: boolean; locationEligible: boolean; bmiEligible: boolean; documentChoice: DocumentChoice; setDocumentChoice: (v: DocumentChoice) => void; canContinue: boolean; nextStep: () => void; onClose: () => void; onNotice: (message: string) => void; onNavigate: (to: string) => void };

function CheckerModal(props: CheckerProps) {
  const { step, setStep, birth, setBirth, location, setLocation, height, setHeight, weight, setWeight, bmi, ageEligible, locationEligible, bmiEligible, documentChoice, setDocumentChoice, canContinue, nextStep, onClose, onNotice, onNavigate } = props;
  const passed = ageEligible && locationEligible && bmiEligible;
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checker-title"><div className="checker-modal"><div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-9"><div><p className="text-xs font-bold text-[#1261D6]">1분 사전 자격 확인</p><h2 id="checker-title" className="mt-1 text-xl font-extrabold text-[#0B2E5E]">내 참가 자격 확인하기</h2></div><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="닫기"><X size={20} /></button></div><div className="px-6 pt-6 sm:px-9"><div className="flex items-center justify-between text-[11px] font-bold text-slate-400">{[['1', '기본정보'], ['2', '신체정보'], ['3', '서류 확인'], ['4', '결과']].map(([num, label]) => <div key={num} className={`flex items-center gap-1.5 ${Number(num) <= step ? 'text-[#1261D6]' : ''}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full ${Number(num) <= step ? 'bg-blue-100' : 'bg-slate-100'}`}>{Number(num) < step ? <Check size={13} /> : num}</span><span className="hidden sm:inline">{label}</span></div>)}</div><div className="mt-7">{step === 1 && <><StepIntro title="기본정보를 입력해 주세요" text="현재 기준으로 참가 가능성을 미리 확인해 드립니다." /><label className="field-label">생년월일<input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} /></label><label className="field-label">주민등록상 거주지<select value={location} onChange={(e) => setLocation(e.target.value)}><option>경산시</option><option>경산시 외</option></select></label></>}{step === 2 && <><StepIntro title="신체정보를 입력해 주세요" text="신장과 체중을 입력하면 BMI가 자동으로 계산됩니다." /><div className="grid gap-4 sm:grid-cols-2"><label className="field-label">신장 (cm)<input inputMode="numeric" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="예: 170" /></label><label className="field-label">체중 (kg)<input inputMode="decimal" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="예: 67.7" /></label></div><div className="bmi-result"><div><span className="text-xs font-bold text-slate-500">나의 BMI</span><strong>{bmi ? bmi.toFixed(1) : '-'}</strong></div><div className="flex-1"><div className="bmi-track"><span style={{ width: `${Math.min(Math.max((bmi / 35) * 100, 5), 100)}%` }} /></div><p className={`mt-2 text-xs font-bold ${bmiEligible ? 'text-[#20A56A]' : 'text-amber-600'}`}>{bmi ? (bmiEligible ? '프로그램 기준 충족' : '프로그램 기준 미충족') : '신장과 체중을 입력해 주세요'}</p></div></div></>}{step === 3 && <><StepIntro title="건강보험 자격확인서를 준비할 수 있나요?" text="신청에 필요한 서류의 현재 준비 상태를 알려주세요." /><div className="space-y-3">{[['ready', '네, 이미 발급했어요'], ['can-get', '아직 없지만 발급할 수 있어요'], ['need-help', '발급 방법을 모르겠어요']].map(([value, label]) => <button type="button" className={`choice-card ${documentChoice === value ? 'selected' : ''}`} key={value} onClick={() => setDocumentChoice(value as DocumentChoice)}><span className="choice-radio">{documentChoice === value && <span />}</span>{label}<ArrowRight size={15} className="ml-auto text-slate-400" /></button>)}</div><button onClick={() => onNotice('국민건강보험공단 홈페이지 또는 The건강보험 앱에서 발급할 수 있습니다.')} className="mt-5 flex items-center gap-2 text-xs font-bold text-[#1261D6]"><PlayCircle size={15} /> 건강보험 자격확인서 발급 방법 보기</button></>}{step === 4 && <Result passed={passed} ageEligible={ageEligible} locationEligible={locationEligible} bmiEligible={bmiEligible} bmi={bmi} documentChoice={documentChoice} onRestart={() => setStep(1)} onClose={onClose} onNotice={onNotice} onNavigate={onNavigate} />}</div></div>{step < 4 && <div className="mt-8 flex items-center justify-between border-t border-slate-100 px-6 py-5 sm:px-9">{step > 1 ? <button onClick={() => setStep((step - 1) as CheckerStep)} className="button button-ghost">이전 단계</button> : <span className="flex items-center gap-1.5 text-xs text-slate-400"><LockKeyhole size={14} /> 별도 저장하지 않습니다</span>}<button onClick={nextStep} disabled={!canContinue} className="button button-primary disabled:cursor-not-allowed disabled:opacity-40">{step === 3 ? '결과 확인하기' : '다음 단계'} <ArrowRight size={16} /></button></div>}</div></div>;
}

function StepIntro({ title, text }: { title: string; text: string }) { return <div className="mb-6"><h3 className="text-lg font-extrabold text-[#0B2E5E]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>; }
function Result({ passed, ageEligible, locationEligible, bmiEligible, bmi, documentChoice, onRestart, onClose, onNotice, onNavigate }: { passed: boolean; ageEligible: boolean; locationEligible: boolean; bmiEligible: boolean; bmi: number; documentChoice: DocumentChoice; onRestart: () => void; onClose: () => void; onNotice: (message: string) => void; onNavigate: (to: string) => void }) { const rows = [['연령', ageEligible ? '만 19~34세' : '기준 확인 필요', ageEligible], ['거주지', locationEligible ? '경산시 거주' : '경산시 외', locationEligible], ['BMI', bmi ? `${bmi.toFixed(1)} / ${bmiEligible ? '기준 충족' : '기준 미충족'}` : '입력 확인 필요', bmiEligible], ['건강보험 자격확인서', documentChoice === 'ready' ? '제출 준비 완료' : '제출 준비 필요', true]] as const; return <div className="pb-2 text-center"><div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${passed ? 'bg-[#EAF8F1] text-[#20A56A]' : 'bg-amber-50 text-amber-500'}`}>{passed ? <CheckCircle2 size={34} /> : <AlertCircle size={34} />}</div><h3 className="mt-5 text-xl font-extrabold text-[#0B2E5E]">{passed ? '참가 자격 기준에 해당할 가능성이 높아요!' : '현재 입력 기준으로는 참가 자격에 해당하지 않아요'}</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{passed ? '입력하신 정보를 기준으로 사전 자격요건을 충족했습니다.' : '입력 정보가 정확한지 다시 확인하거나 자세한 기준은 운영기관에 문의해 주세요.'}</p><div className="result-list">{rows.map(([label, value, okay]) => <div className="result-row" key={label}><span>{label}</span><b className={okay ? 'text-[#20A56A]' : 'text-amber-600'}>{okay ? <Check size={15} /> : <AlertCircle size={15} />}{value}</b></div>)}</div><div className="mt-6 flex flex-col gap-3"><button onClick={() => passed ? onNotice('온라인 신청은 운영기관 안내 후 진행됩니다.') : onRestart()} className="button button-primary w-full">{passed ? '신청하러 가기' : '입력 정보 다시 확인하기'} <ArrowRight size={17} /></button><button onClick={() => { onNavigate('/issuance'); onClose(); }} className="button button-secondary w-full">건강보험 자격확인서 발급 방법 보기</button><button onClick={onClose} className="button button-ghost w-full">{passed ? '결과 다시 확인하기' : '참가 자격 기준 보기'}</button></div></div>; }

export default App;
