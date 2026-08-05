# Media CMS

Drop image and video files here to add content to the portfolio. Files are automatically discovered and displayed — no configuration needed.

## Naming Convention

Files must follow this naming pattern to be recognized:

### Basic Format
`[Title]_[Year].[extension]`

**Examples:**
- `SanFrancisco_2019.jpg`
- `NewYork_2017.png`
- `EventName_2023.mp4`

### With Credit/Attribution
`[Title]_[Year]_[CreditLabel].[extension]`

**Examples:**
- `SanFrancisco_2019_CoastalProject.jpg` → renders with credit "CoastalProject"
- `Photo_2022_MyPhotographer.jpg` → renders with credit "MyPhotographer"

### Multiple Photos with Same Title & Year
Append a dash and number suffix to make filenames unique on disk. The suffix is stripped before rendering, so the caption remains identical:

`[Title]_[Year]-2.[extension]` or `[Title]_[Year]-3.[extension]`

**Example:**
- `SanFrancisco_2019.jpg` → "SanFrancisco, 2019"
- `SanFrancisco_2019-2.jpg` → "SanFrancisco, 2019" (same caption, different file)
- `SanFrancisco_2019_CoastalProject-2.jpg` → same as above, but with credit

## Supported Formats

**Images:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

**Video:** `.mp4`, `.webm`, `.mov` (auto-plays, loops, muted)

## How It Works

1. Files are read from this folder on each build/deployment
2. Filenames are parsed to extract title, year, and optional credit
3. Files are displayed in randomized order with randomized layout variants
4. No two identical variants appear consecutively

Files not matching the naming format will be silently skipped and logged to the build output.
