import type { ReactNode, SVGAttributes } from 'react';

export type IconProps = SVGAttributes<SVGSVGElement>;

export function FileText(props: IconProps): ReactNode {
  const {
    width = '1.5em',
    height = '1.5em',
    fill = 'currentColor',
    ...rest
  } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 256 256" {...rest}>
      <path
        fill={fill}
        d="m213.66 82.34l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66M160 51.31L188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48zm-32-80a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8m0 32a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8"
      />
    </svg>
  );
}

export function List(props: IconProps): ReactNode {
  const {
    width = '1.5em',
    height = '1.5em',
    fill = 'currentColor',
    ...rest
  } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 256 256" {...rest}>
      <path
        fill={fill}
        d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16"
      />
    </svg>
  );
}
