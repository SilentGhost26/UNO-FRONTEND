export const ok = (result) => {
    return { ok: true, result: result };
}

export const err = (error) => {
    return { ok: false, error: error };
}