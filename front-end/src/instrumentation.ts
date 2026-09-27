export async function register() {

    if (process.env.NEXT_RUNTIME === 'nodejs') {

        const { iniciarSchedulerLlaves } =
            await import('./lib/crypto/scheduler');

        iniciarSchedulerLlaves();
    }
}