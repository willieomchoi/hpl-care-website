import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Lock,
  Monitor,
  MousePointer2,
  Printer,
  RotateCcw,
  Search,
  Smartphone,
  X,
} from 'lucide-react';

type Track = 'pc' | 'mobile';
type Guide = { badge: string; title: string; caption: string; mock: ReactNode; tips: string[]; warn?: string };

/* ── 클릭 위치 표시 ─────────────────────────────── */
function Hotspot({ children, className = '', tone = 'blue' }: { children: ReactNode; className?: string; tone?: 'blue' | 'green' }) {
  const color = tone === 'green' ? '#20A56A' : '#1261D6';
  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="pointer-events-none absolute -inset-1 animate-ping rounded-lg border-2" style={{ borderColor: color }} aria-hidden />
      <span className="relative inline-flex flex-1 rounded-md" style={{ boxShadow: `0 0 0 2px ${color}` }}>{children}</span>
      <MousePointer2 size={15} strokeWidth={2.5} className="absolute -bottom-2.5 -right-2.5 z-10" style={{ color }} fill="#ffffff" aria-hidden />
    </span>
  );
}

/* ── PC 브라우저 목업 ───────────────────────────── */
function BrowserFrame({ url, highlightUrl, children }: { url: string; highlightUrl?: boolean; children?: ReactNode }) {
  const bar = (
    <span className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[10px] font-bold text-slate-500">
      <Lock size={9} className="shrink-0 text-[#20A56A]" /> {url}
    </span>
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_36px_-20px_rgba(11,46,94,0.5)]">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2.5">
        <span className="flex shrink-0 gap-1">
          {['#f87171', '#fbbf24', '#34d399'].map((color) => <i key={color} className="h-2 w-2 rounded-full" style={{ background: color }} />)}
        </span>
        {highlightUrl ? <Hotspot className="flex-1">{bar}</Hotspot> : bar}
      </div>
      {children}
    </div>
  );
}

/* ── 공단 홈페이지 상단 메뉴 목업 ────────────────── */
function SiteNav({ highlight }: { highlight?: 'login' | 'minwon' }) {
  const items = ['민원여기요', '건강iN', '정책센터', '제도소개'];
  return (
    <div className="border-b border-slate-200 bg-white px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0B57A4]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0B57A4] text-[7px] text-white">건</span>
          국민건강보험
        </span>
        <span className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
          <span>회원가입</span>
          {highlight === 'login'
            ? <Hotspot><span className="rounded-md bg-[#1261D6] px-2.5 py-1 text-[9px] font-extrabold text-white">로그인</span></Hotspot>
            : <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-500">로그인</span>}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-0.5 border-t border-slate-100 pt-2">
        {items.map((item) => item === '민원여기요' && highlight === 'minwon'
          ? <Hotspot key={item}><span className="px-1.5 py-1 text-[9.5px] font-extrabold text-[#1261D6]">{item}</span></Hotspot>
          : <span key={item} className="px-1.5 py-1 text-[9.5px] font-bold text-slate-500">{item}</span>)}
      </div>
    </div>
  );
}

/* ── 메뉴 목록 목업 ─────────────────────────────── */
function MenuRows({ rows, active, warn, tone = 'blue' }: { rows: string[]; active: string; warn?: string; tone?: 'blue' | 'green' }) {
  return (
    <div className="divide-y divide-slate-100">
      {rows.map((row) => (
        <div key={row} className="flex items-center justify-between px-3 py-2.5">
          {row === active
            ? <Hotspot tone={tone}><span className="px-1.5 py-0.5 text-[11px] font-extrabold" style={{ color: tone === 'green' ? '#188b58' : '#1261D6' }}>{row}</span></Hotspot>
            : <span className={`px-1.5 py-0.5 text-[11px] font-bold ${row === warn ? 'text-amber-600' : 'text-slate-500'}`}>{row}</span>}
          {row === warn
            ? <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[8.5px] font-extrabold text-amber-600"><AlertTriangle size={9} /> 다른 서류</span>
            : <span className="text-[8.5px] font-bold text-slate-300">발급</span>}
        </div>
      ))}
    </div>
  );
}

/* ── 휴대전화 목업 ──────────────────────────────── */
function PhoneFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-[224px] overflow-hidden rounded-[26px] border-[5px] border-[#1E293B] bg-white shadow-[0_18px_38px_-18px_rgba(11,46,94,0.55)]">
      <div className="flex items-center justify-center bg-[#1E293B] pb-1.5 pt-1">
        <span className="h-1 w-10 rounded-full bg-slate-600" />
      </div>
      <div className="flex items-center justify-between border-b border-slate-100 bg-[#F4F9FE] px-3 py-2">
        <span className="text-[9.5px] font-extrabold text-[#0B57A4]">{label}</span>
        <span className="text-[8px] font-bold text-slate-400">The건강보험</span>
      </div>
      {children}
    </div>
  );
}

function AuthTiles({ active }: { active: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 p-3">
      {['간편인증', '공동인증서', '금융인증서'].map((item) => item === active
        ? <Hotspot key={item}><span className="flex w-full flex-col items-center gap-1 rounded-lg bg-[#EAF4FD] px-1 py-3 text-[9px] font-extrabold text-[#1261D6]"><Check size={12} />{item}</span></Hotspot>
        : <span key={item} className="flex flex-col items-center gap-1 rounded-lg border border-slate-200 px-1 py-3 text-[9px] font-bold text-slate-400">{item}</span>)}
    </div>
  );
}

/* ── 단계 데이터 ────────────────────────────────── */
const pcGuides: Guide[] = [
  {
    badge: '홈페이지 접속',
    title: '국민건강보험공단 홈페이지를 열어요',
    caption: '인터넷 주소창에 nhis.or.kr 을 입력하세요.',
    mock: (
      <BrowserFrame url="www.nhis.or.kr" highlightUrl>
        <div className="space-y-2 bg-[#F4F9FE] px-3 py-4">
          <span className="block text-[11px] font-extrabold text-[#0B2E5E]">국민건강보험공단</span>
          <div className="grid grid-cols-4 gap-1.5">
            {['보험료 조회', '증명서 발급', '자격 확인', '환급금'].map((item) => (
              <span key={item} className="rounded-lg bg-white px-1 py-2.5 text-center text-[8px] font-bold text-slate-500">{item}</span>
            ))}
          </div>
        </div>
      </BrowserFrame>
    ),
    tips: ['포털에서 “국민건강보험공단”을 검색해 첫 번째 공식 사이트로 들어가도 됩니다.', '주소가 nhis.or.kr 인지 확인하면 더 안전합니다.'],
  },
  {
    badge: '로그인',
    title: '오른쪽 위 “로그인” 버튼을 누르세요',
    caption: '증명서 발급은 본인 확인이 필요해서 로그인부터 해야 해요.',
    mock: (
      <BrowserFrame url="www.nhis.or.kr">
        <SiteNav highlight="login" />
        <div className="space-y-1.5 bg-[#F4F9FE] px-3 py-4">
          <span className="block h-2 w-24 rounded-full bg-slate-200" />
          <span className="block h-2 w-36 rounded-full bg-slate-200" />
        </div>
      </BrowserFrame>
    ),
    tips: ['화면 오른쪽 맨 위에 있습니다.', '회원가입을 하지 않아도 간편인증으로 로그인할 수 있습니다.'],
  },
  {
    badge: '본인인증',
    title: '“간편인증”을 골라 본인인증해요',
    caption: '평소 쓰는 카카오·네이버·PASS 인증으로 가장 쉽게 됩니다.',
    mock: (
      <BrowserFrame url="www.nhis.or.kr / 로그인">
        <div className="border-b border-slate-100 px-3 pt-3 text-[10px] font-extrabold text-[#0B2E5E]">로그인 방법 선택</div>
        <AuthTiles active="간편인증" />
      </BrowserFrame>
    ),
    tips: ['인증서(카카오·네이버·PASS 등)를 선택합니다.', '이름 · 생년월일 · 휴대전화번호를 입력합니다.', '휴대전화에 온 알림에서 인증을 완료하고 “인증 완료”를 누릅니다.'],
  },
  {
    badge: '메뉴 이동',
    title: '상단 “민원여기요”에서 개인민원으로',
    caption: '메뉴에 마우스를 올리면 아래로 목록이 펼쳐집니다.',
    mock: (
      <BrowserFrame url="www.nhis.or.kr">
        <SiteNav highlight="minwon" />
        <div className="bg-white">
          <div className="border-b border-slate-100 bg-[#F7FBFF] px-3 py-1.5 text-[8.5px] font-bold text-slate-400">민원여기요</div>
          <MenuRows rows={['개인민원', '사업장민원', '보험료 납부', '민원신청 조회']} active="개인민원" />
        </div>
      </BrowserFrame>
    ),
    tips: ['“민원여기요”를 클릭하거나 마우스를 올립니다.', '펼쳐진 목록에서 “개인민원”을 클릭합니다.'],
  },
  {
    badge: '증명서 메뉴',
    title: '“증명서 발급·확인”을 선택해요',
    caption: '개인민원 화면 왼쪽 목록에 있습니다.',
    mock: (
      <BrowserFrame url="개인민원">
        <div className="grid grid-cols-[1.1fr_1fr]">
          <div className="border-r border-slate-100">
            <div className="border-b border-slate-100 bg-[#F7FBFF] px-3 py-1.5 text-[8.5px] font-bold text-slate-400">개인민원</div>
            <MenuRows rows={['보험료 조회·납부', '증명서 발급·확인', '자격 조회', '환급금 조회']} active="증명서 발급·확인" />
          </div>
          <div className="space-y-1.5 bg-[#F4F9FE] p-3">
            {[20, 28, 16].map((width, index) => <span key={index} className="block h-2 rounded-full bg-slate-200" style={{ width: `${width * 3}px` }} />)}
          </div>
        </div>
      </BrowserFrame>
    ),
    tips: ['메뉴 이름이 “증명서 발급/확인”으로 보일 수도 있습니다.', '증명서 목록 화면으로 이동합니다.'],
  },
  {
    badge: '서류 선택',
    title: '“건강보험 자격확인서”를 선택하세요',
    caption: '이름이 비슷한 서류가 함께 있어서 꼭 확인해야 해요.',
    mock: (
      <BrowserFrame url="증명서 발급·확인">
        <div className="border-b border-slate-100 bg-[#F7FBFF] px-3 py-1.5 text-[8.5px] font-bold text-slate-400">발급 가능한 증명서</div>
        <MenuRows rows={['건강보험 자격확인서', '건강보험 자격득실확인서', '보험료 납부확인서', '건강보험료 완납증명서']} active="건강보험 자격확인서" warn="건강보험 자격득실확인서" tone="green" />
      </BrowserFrame>
    ),
    tips: ['서류명이 “건강보험 자격확인서”인지 다시 확인합니다.', '공고문에 적힌 서류명과 같은지 비교하세요.'],
    warn: '“건강보험 자격득실확인서”는 다른 서류입니다. 이름이 비슷하니 혼동하지 마세요.',
  },
  {
    badge: '발급·출력',
    title: '내용을 확인하고 “인쇄”를 누르세요',
    caption: '이름과 정보가 맞는지 확인한 뒤 출력하면 끝입니다.',
    mock: (
      <BrowserFrame url="건강보험 자격확인서 발급">
        <div className="space-y-2 p-3">
          {[['성명', '홍○○'], ['생년월일', '1998-03-15'], ['발급 용도', '제출용']].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-lg bg-[#F7FBFF] px-2.5 py-2 text-[9.5px]">
              <span className="font-bold text-slate-400">{label}</span>
              <b className="font-extrabold text-[#0B2E5E]">{value}</b>
            </div>
          ))}
          <div className="flex items-center justify-end gap-2 pt-1">
            <span className="rounded-md border border-slate-200 px-2.5 py-1.5 text-[9px] font-bold text-slate-400">PDF 저장</span>
            <Hotspot><span className="flex items-center gap-1 rounded-md bg-[#1261D6] px-3 py-1.5 text-[9px] font-extrabold text-white"><Printer size={10} /> 인쇄</span></Hotspot>
          </div>
        </div>
      </BrowserFrame>
    ),
    tips: ['이름 등 본인 정보가 정확한지 확인합니다.', '프린터가 없으면 “PDF 저장” 후 편의점·무인출력기에서 출력하세요.', '출력한 서류는 방문 신청 때 지참합니다.'],
  },
];

const mobileGuides: Guide[] = [
  {
    badge: '앱 설치',
    title: '“The건강보험” 앱을 설치해요',
    caption: '앱스토어 또는 Play스토어에서 검색해 설치하세요.',
    mock: (
      <PhoneFrame label="앱 검색">
        <div className="p-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2 py-1.5 text-[9px] font-bold text-slate-500"><Search size={10} /> The건강보험</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B57A4] text-[9px] font-extrabold text-white">건</span>
              <span className="text-[9.5px] font-extrabold text-[#0B2E5E]">The건강보험</span>
            </span>
            <Hotspot><span className="rounded-full bg-[#1261D6] px-3 py-1 text-[9px] font-extrabold text-white">설치</span></Hotspot>
          </div>
        </div>
      </PhoneFrame>
    ),
    tips: ['국민건강보험공단 공식 앱인지 확인하세요.', '설치가 끝나면 앱을 실행합니다.'],
  },
  {
    badge: '로그인',
    title: '앱을 열고 “간편인증”으로 로그인',
    caption: '카카오·네이버·PASS 등 평소 쓰는 인증을 고르면 됩니다.',
    mock: (
      <PhoneFrame label="로그인">
        <div className="px-3 pt-3 text-[9.5px] font-extrabold text-[#0B2E5E]">로그인 방법</div>
        <div className="space-y-2 p-3">
          <Hotspot className="w-full"><span className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#EAF4FD] py-2.5 text-[9.5px] font-extrabold text-[#1261D6]"><Check size={11} /> 간편인증</span></Hotspot>
          {['공동인증서', '금융인증서'].map((item) => <span key={item} className="block rounded-lg border border-slate-200 py-2.5 text-center text-[9.5px] font-bold text-slate-400">{item}</span>)}
        </div>
      </PhoneFrame>
    ),
    tips: ['이름 · 생년월일 · 휴대전화번호를 입력합니다.', '휴대전화 알림에서 인증을 완료합니다.'],
  },
  {
    badge: '메뉴 열기',
    title: '아래쪽 “전체메뉴”를 누르세요',
    caption: '앱 화면 맨 아래 메뉴 버튼입니다.',
    mock: (
      <PhoneFrame label="홈">
        <div className="space-y-1.5 bg-[#F4F9FE] p-3">
          {[60, 90, 70].map((width, index) => <span key={index} className="block h-2.5 rounded-full bg-slate-200" style={{ width: `${width}px` }} />)}
        </div>
        <div className="flex items-end justify-around border-t border-slate-100 px-2 py-2">
          {['홈', '민원', '조회', '전체메뉴'].map((item) => item === '전체메뉴'
            ? <Hotspot key={item}><span className="px-1.5 py-0.5 text-[9px] font-extrabold text-[#1261D6]">{item}</span></Hotspot>
            : <span key={item} className="px-1.5 py-0.5 text-[9px] font-bold text-slate-400">{item}</span>)}
        </div>
      </PhoneFrame>
    ),
    tips: ['“민원” 탭에서 바로 들어가도 됩니다.', '메뉴 이름은 앱 버전에 따라 조금 다를 수 있습니다.'],
  },
  {
    badge: '증명서 메뉴',
    title: '“민원여기요 → 증명서 발급”으로',
    caption: '증명서를 발급할 수 있는 목록으로 이동합니다.',
    mock: (
      <PhoneFrame label="전체메뉴">
        <MenuRows rows={['민원여기요', '보험료 조회', '건강검진', '자격 조회']} active="민원여기요" />
        <div className="border-t border-slate-100 bg-[#F7FBFF]">
          <MenuRows rows={['증명서 발급', '보험료 납부']} active="증명서 발급" />
        </div>
      </PhoneFrame>
    ),
    tips: ['“증명서 발급/확인”으로 표시될 수 있습니다.'],
  },
  {
    badge: '서류 선택',
    title: '“건강보험 자격확인서”를 골라 발급',
    caption: '비슷한 이름의 서류와 헷갈리지 않도록 확인하세요.',
    mock: (
      <PhoneFrame label="증명서 발급">
        <MenuRows rows={['건강보험 자격확인서', '건강보험 자격득실확인서', '보험료 납부확인서']} active="건강보험 자격확인서" warn="건강보험 자격득실확인서" tone="green" />
      </PhoneFrame>
    ),
    tips: ['서류명이 공고문과 같은지 확인합니다.', '발급 버튼을 누르면 서류가 만들어집니다.'],
    warn: '“건강보험 자격득실확인서”는 다른 서류입니다. 서류명을 꼭 확인하세요.',
  },
  {
    badge: '저장·출력',
    title: 'PDF로 저장한 뒤 종이로 출력해요',
    caption: '방문 신청 때는 출력한 종이 서류를 지참하세요.',
    mock: (
      <PhoneFrame label="발급 완료">
        <div className="p-3">
          <div className="rounded-xl border border-slate-200 p-3">
            <span className="block text-[9.5px] font-extrabold text-[#0B2E5E]">건강보험 자격확인서</span>
            <div className="mt-2 space-y-1">
              {[70, 50, 60].map((width, index) => <span key={index} className="block h-1.5 rounded-full bg-slate-200" style={{ width: `${width}px` }} />)}
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <Hotspot><span className="flex items-center gap-1 rounded-lg bg-[#1261D6] px-3 py-2 text-[9px] font-extrabold text-white"><Download size={10} /> PDF 저장</span></Hotspot>
          </div>
        </div>
      </PhoneFrame>
    ),
    tips: ['휴대전화 화면이나 캡처 이미지만으로 제출하지 마세요.', '프린터가 없으면 편의점·무인출력기에서 출력할 수 있습니다.'],
  },
];

type Props = { onClose: () => void; onOpenIssuance: () => void };

export default function IssuanceGuideOverlay({ onClose, onOpenIssuance }: Props) {
  const [track, setTrack] = useState<Track>('pc');
  const [index, setIndex] = useState(0);

  const guides = track === 'pc' ? pcGuides : mobileGuides;
  const total = guides.length;
  const guide = guides[index];
  const isLast = index === total - 1;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex((current) => Math.min(current + 1, total - 1));
      if (event.key === 'ArrowLeft') setIndex((current) => Math.max(current - 1, 0));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, total]);

  const changeTrack = (next: Track) => {
    setTrack(next);
    setIndex(0);
  };

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-[#F7FBFF]" role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <header className="shrink-0 border-b border-slate-200 bg-white/95 px-5 pb-3 pt-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold text-[#1261D6]">건강보험 자격확인서 발급 방법</p>
            <h2 id="guide-title" className="mt-0.5 text-[15px] font-extrabold text-[#0B2E5E]">{track === 'pc' ? 'PC 홈페이지에서 발급하기' : 'The건강보험 앱에서 발급하기'}</h2>
          </div>
          <button onClick={onClose} className="-mr-1 rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="발급 방법 안내 닫기"><X size={20} /></button>
        </div>

        <div className="mx-auto mt-3 w-full max-w-3xl">
          <div className="flex rounded-xl bg-slate-100 p-1">
            {([['pc', 'PC 홈페이지', Monitor], ['mobile', '휴대전화 앱', Smartphone]] as const).map(([value, label, Icon]) => (
              <button
                key={value}
                onClick={() => changeTrack(value)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-extrabold transition ${track === value ? 'bg-white text-[#1261D6] shadow-sm' : 'text-slate-500'}`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-[#1261D6] transition-all duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
            </div>
            <span className="shrink-0 text-[11px] font-extrabold text-slate-500"><b className="text-[#1261D6]">{index + 1}</b> / {total} 단계</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto w-full max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FD] px-3 py-1.5 text-[11px] font-extrabold text-[#1261D6]">
            STEP {index + 1} · {guide.badge}
          </span>
          <h3 className="mt-4 text-[23px] font-extrabold leading-[1.3] tracking-[-0.03em] text-[#0B2E5E]">{guide.title}</h3>
          <p className="mt-2.5 text-[14px] leading-7 text-slate-600">{guide.caption}</p>

          <div className="mt-6 rounded-[22px] border border-blue-100 bg-white p-4 sm:p-6">
            <p className="mb-4 flex items-center gap-1.5 text-[11px] font-extrabold text-slate-400">
              <MousePointer2 size={12} className="text-[#1261D6]" /> 파란 표시가 눌러야 할 곳이에요
            </p>
            {guide.mock}
          </div>

          <div className="mt-5 rounded-[22px] border border-slate-200 bg-white px-5 py-5">
            <p className="text-[13px] font-extrabold text-[#0B2E5E]">이렇게 하세요</p>
            <ul className="mt-3 space-y-2.5">
              {guide.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#20A56A]" /> {tip}
                </li>
              ))}
            </ul>
          </div>

          {guide.warn && (
            <div className="mt-4 flex items-start gap-3 rounded-[22px] border border-amber-200/80 bg-[#FFF7E8] px-5 py-4 text-[13px] font-bold leading-6 text-amber-800">
              <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-500" /> {guide.warn}
            </div>
          )}

          {isLast && (
            <div className="mt-4 flex flex-col gap-3 rounded-[22px] bg-[#0B3C78] px-5 py-6">
              <p className="text-[15px] font-extrabold leading-6 text-white">서류를 출력했다면 방문 신청 준비만 남았어요</p>
              <p className="text-[13px] leading-6 text-blue-100">청년사회서비스는 온라인 접수가 불가하며, 출력한 서류를 지참해 거주지 관할 읍·면·동 행정복지센터에 방문해야 합니다.</p>
              <button onClick={onOpenIssuance} className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[13px] font-extrabold text-[#0B2E5E]">
                발급·방문 신청 안내 전체 보기 <ExternalLink size={15} />
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-1.5 pb-2">
            {guides.map((item, dotIndex) => (
              <button
                key={item.badge}
                onClick={() => setIndex(dotIndex)}
                aria-label={`${dotIndex + 1}단계로 이동`}
                className={`h-2 rounded-full transition-all ${dotIndex === index ? 'w-6 bg-[#1261D6]' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="shrink-0 border-t border-slate-200 bg-white px-5 py-4">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          {index === 0 ? (
            <button onClick={onClose} className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-[14px] font-extrabold text-slate-500">닫기</button>
          ) : (
            <button onClick={() => setIndex(index - 1)} className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-[14px] font-extrabold text-slate-600"><ArrowLeft size={16} /> 이전</button>
          )}
          {isLast ? (
            <button onClick={() => setIndex(0)} className="flex h-12 flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[#20A56A] text-[14px] font-extrabold text-white"><RotateCcw size={15} /> 처음부터 다시 보기</button>
          ) : (
            <button onClick={() => setIndex(index + 1)} className="flex h-12 flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[#1261D6] text-[14px] font-extrabold text-white">다음 단계 <ArrowRight size={16} /></button>
          )}
        </div>
      </footer>
    </div>
  );
}
