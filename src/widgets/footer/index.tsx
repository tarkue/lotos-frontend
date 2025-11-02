import { cn } from "@/src/shared/libs/utils";
import { Container } from "@/src/shared/ui/container";
import { Link } from "@/src/shared/ui/link";
import { FOOTER_LINKS } from "./models/footer-links";

export const Footer = () => {
  return (
    <footer className={cn("w-full my-6 bg-base-100 absolute bottom-0")}>
      <Container className={cn("justify-end")}>
        <ul className="flex gap-4">
          {FOOTER_LINKS.map((el, i) => (
            <li key={i}>
              <Link href={el.href} className="uppercase">
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};
