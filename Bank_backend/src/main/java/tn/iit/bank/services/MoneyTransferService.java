package tn.iit.bank.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tn.iit.bank.entities.Account;

@RequiredArgsConstructor
@Service
public class MoneyTransferService {

	private final AccountService accountService;

	public boolean sendMoney(Account sender, Account receiver, float ammount) {
		if (accountService.exist(sender.getRib()) && accountService.exist(receiver.getRib())) {
			if (sender.getBalance() > ammount) {
				sender.setBalance(sender.getBalance() - ammount);
				receiver.setBalance(receiver.getBalance() + ammount);
				accountService.save(receiver);
				accountService.save(sender);
				return true;
			}
		}
		return false;
	}

}
