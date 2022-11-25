package tn.iit.bank.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Account;
import tn.iit.bank.entities.MoneyTransferHistory;
import tn.iit.bank.repositories.MoneyTransferHistoryRepository;

@RequiredArgsConstructor
@Service
public class MoneyTransferService {

	private final AccountService accountService;
	private final MoneyTransferHistoryRepository moneyTransferHistoryRepository;

	public List<MoneyTransferHistory> getAll() {
		return moneyTransferHistoryRepository.findAll();
	}

	public boolean sendMoney(Long senderRib, Long receiverRib, float amount) {
		try {
			Account sender = accountService.getAccountById(senderRib);
			Account receiver = accountService.getAccountById(receiverRib);
			if (sender.getBalance() > amount) {
				sender = performSend(sender, amount);
				receiver = performReceive(receiver, amount);
				MoneyTransferHistory history = createTransferHistory(sender, receiver, amount);
				saveMoneyTransferHistory(history);
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		return false;
	}

	private MoneyTransferHistory createTransferHistory(Account sender, Account receiver, float amount) {
		MoneyTransferHistory history = MoneyTransferHistory.builder().sender(sender).receiver(receiver).amount(amount)
				.build();
		return history;
	}

	private MoneyTransferHistory saveMoneyTransferHistory(MoneyTransferHistory history) {
		return moneyTransferHistoryRepository.saveAndFlush(history);
	}

	private Account performReceive(Account receiver, float amount) {
		receiver.setBalance(receiver.getBalance() + amount);
		return accountService.save(receiver);
	}

	private Account performSend(Account sender, float amount) {
		sender.setBalance(sender.getBalance() - amount);
		return accountService.save(sender);
	}
}
