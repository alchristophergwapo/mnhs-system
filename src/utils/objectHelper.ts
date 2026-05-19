export default class ObjectHelper {
    static restructure<T extends object>(source: unknown, template: T): T {
        const src = (source ?? {}) as Record<string, unknown>;
        const templateKeys = new Set(Object.keys(template));

        const extraKeys = Object.keys(src).filter((key) => !templateKeys.has(key));
        const extraWithOverlap: Record<string, unknown> = {};
        const extraWithoutOverlap: Record<string, unknown> = {};

        for (const key of extraKeys) {
            const extraValue = src[key];
            if (
                extraValue !== null &&
                typeof extraValue === "object" &&
                !Array.isArray(extraValue) &&
                !(extraValue instanceof Date)
            ) {
                const extraValueKeys = new Set(Object.keys(extraValue as object));
                const hasOverlap = [...templateKeys].some((templateKey) => extraValueKeys.has(templateKey));
                if (hasOverlap) {
                    extraWithOverlap[key] = extraValue;
                } else {
                    extraWithoutOverlap[key] = extraValue;
                }
            } else {
                extraWithoutOverlap[key] = extraValue;
            }
        }

        const result: { [key: string]: unknown } = { ...extraWithoutOverlap };

        for (const key in template) {
            if (!Object.prototype.hasOwnProperty.call(template, key)) continue;

            const templateValue = template[key];
            const srcValue = src[key];

            if (typeof srcValue === "object" && srcValue !== null && !Array.isArray(srcValue) &&
                !(srcValue instanceof Date)) {
                result[key] = this.restructure(srcValue ?? {}, templateValue as object) as T[typeof key];
            } else {
                result[key] = srcValue !== null && srcValue !== undefined
                    ? (srcValue as T[typeof key])
                    : templateValue;;
            }
        }

        for (const key of Object.keys(extraWithOverlap)) {
            const extraValue = extraWithOverlap[key] as Record<string, unknown>;

            for (const extraKey of Object.keys(extraValue)) {
                const incomingValue = extraValue[extraKey];

                result[extraKey] = !incomingValue && typeof incomingValue !== "boolean" ? "" : incomingValue;
            }
        }

        return result as T;
    }
}
