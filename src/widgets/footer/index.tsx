import { cn } from "@/src/shared/libs/utils";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { FOOTER_LINKS } from "./models/footer-links";

export const Footer = () => {
  return (
    <footer className={cn("w-full bg-base-gray p-4 sm:px-0")}>
      <Container>
        <ul className="flex flex-col gap-1">
          {FOOTER_LINKS.map((el, i) => (
            <li key={i} className="flex w-full">
              <Link href={el.href} className="w-full text-dark-gray">
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};
