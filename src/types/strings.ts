export type Alphanumeric
  = | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'

export type Slugify<T extends string> = Lowercase<ReplaceSpacesWithHyphens<RemoveSpecialCharacters<T>>>

export type KebabCase<T extends string> = Lowercase<ReplaceSpacesWithHyphens<T>>

export type CamelCase<T extends string> = T extends `${infer Head} ${infer Tail}`
  ? `${Lowercase<Head>}${CapitalizeWords<Tail>}`
  : T

export type SnakeCase<T extends string> = T extends `${infer Head} ${infer Tail}`
  ? `${Lowercase<Head>}_${SnakeCase<Tail>}`
  : Lowercase<T>

export type RemoveSpecialCharacters<T extends string> = T extends `${infer Head}${infer Tail}`
  ? Head extends Alphanumeric | ' '
    ? `${Head}${RemoveSpecialCharacters<Tail>}`
    : RemoveSpecialCharacters<Tail>
  : T

export type ReplaceSpacesWithHyphens<T extends string> = T extends `${infer Head} ${infer Tail}`
  ? `${Head}-${ReplaceSpacesWithHyphens<Tail>}`
  : T

export type CapitalizeWords<T extends string> = T extends `${infer Head} ${infer Tail}`
  ? `${Capitalize<Head>}${CapitalizeWords<Tail>}`
  : Capitalize<T>
