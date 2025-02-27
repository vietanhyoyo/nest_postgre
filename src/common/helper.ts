export class Helper {
  static convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  static removeReferences(str) {
    return str.replace(/\[\w+\s*\d*\]/g, '');
  }
}
