interface ErrorProps {
  msg: string;
}

export const Error = ({ msg }: ErrorProps) => (
  <div className="error">{ msg }</div>
);
