type RepoDoodleProps = { kind: 'plant' | 'pyquest' | 'cpr' };

export default function RepoDoodle({ kind }: RepoDoodleProps) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg className={`repo-doodle repo-doodle-${kind}`} viewBox="0 0 280 190" role="img" aria-label={kind === 'plant' ? 'Doodle of a plant and sensor' : kind === 'pyquest' ? 'Doodle of a frog in a game world' : 'Doodle of a pulse and sensor'}>
      <path d="M18 154c58 17 170 20 243-2" {...shared} strokeWidth="1.5" />
      {kind === 'plant' && <>
        <path d="M133 140V55m0 55c-28-26-50-25-55-60 34 2 47 21 55 60Zm0-23c20-42 43-54 71-52-13 31-35 49-71 52Z" {...shared} />
        <path d="M92 138h84l-10 38h-65z" {...shared} fill="#d9f26f" />
        <path d="M30 56h35v29H30zM47 85v31m-13-52h26" {...shared} />
        <path d="M70 72c13 0 20 12 20 24m-20-35c21 0 33 17 33 35" {...shared} strokeWidth="1.5" />
        <circle cx="48" cy="70" r="5" fill="#5985ee" />
      </>}
      {kind === 'pyquest' && <>
        <path d="M35 132h59l22-30h49l21 30h56" {...shared} />
        <path d="M47 104h43V55H47zm73-21h43V35h-43zm73 21h43V55h-43z" {...shared} fill="#e7efff" />
        <path d="M117 145c12-21 35-22 48 0" {...shared} fill="#d9f26f" />
        <circle cx="128" cy="126" r="9" {...shared} fill="#d9f26f" /><circle cx="154" cy="126" r="9" {...shared} fill="#d9f26f" />
        <circle cx="128" cy="126" r="2.5" /><circle cx="154" cy="126" r="2.5" />
        <path d="M133 148c5 4 11 4 16 0" {...shared} strokeWidth="1.5" />
      </>}
      {kind === 'cpr' && <>
        <path d="M25 96h43l17-39 21 83 19-46h24l13 22 20-59 17 39h54" {...shared} stroke="#f47c61" />
        <path d="M91 153h102m-88 0v20m74-20v20" {...shared} />
        <path d="M115 127h56V59h-56z" {...shared} fill="#d9f26f" />
        <circle cx="128" cy="76" r="5" fill="#202725" /><circle cx="158" cy="76" r="5" fill="#202725" />
        <path d="M128 104h31" {...shared} strokeWidth="1.5" />
      </>}
    </svg>
  );
}
